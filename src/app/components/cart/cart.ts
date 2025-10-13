import { Component, inject, computed } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { PokemonCard } from '../pokemon/pokemon-card/pokemon-card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, PokemonCard, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  private cartService = inject(CartService);
  cartItems = computed(() => {
    const items = this.cartService.getCartItems()();
    return [...items].reverse();
  });

  removeFromCart(pokemonId: number): void {
    this.cartService.removeFromCart(pokemonId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getCartCount(): number {
    return this.cartItems().length;
  }
}
