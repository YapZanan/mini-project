import { Injectable } from '@angular/core';
import { NavLink } from '../utils/nav-link.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private publicLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/cv', label: 'CV' },
  ];

  private authenticatedLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/cv', label: 'CV' },
    { path: '/pokemon', label: 'Pokemon' },
    { path: '/gatcha', label: 'Gatcha' },
    { path: '/counter', label: 'Counter' },
    { path: '/cart', label: 'Cart' },
  ];

  getPublicLinks(): NavLink[] {
    return this.publicLinks;
  }

  getAuthenticatedLinks(): NavLink[] {
    return this.authenticatedLinks;
  }
}
