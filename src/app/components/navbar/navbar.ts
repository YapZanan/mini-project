import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { NavLink } from '../../utils/nav-link.model';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  links: NavLink[] = [];
  isLoggedIn = false;
  cartCount = signal(0);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  constructor(private navbarService: NavbarService) {
    this.updateNavLinks();
    this.cartCount.set(this.cartService.getCartCount());
  }

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateNavLinks();
  }

  updateNavLinks(): void {
    if (this.isLoggedIn) {
      this.links = this.navbarService.getAuthenticatedLinks();
    } else {
      this.links = this.navbarService.getPublicLinks();
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
