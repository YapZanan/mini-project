import { Injectable, signal } from '@angular/core';
import { Pokemon } from '../../utils/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY = 'pokemon_cart';
  private cartItems = signal<Pokemon[]>(this.loadFromStorage());

  getCartItems() {
    return this.cartItems.asReadonly();
  }

  addToCart(pokemon: Pokemon): void {
    const currentItems = this.cartItems();
    if (!currentItems.some((item) => item.id === pokemon.id)) {
      const updatedItems = [...currentItems, pokemon];
      this.cartItems.set(updatedItems);
      this.saveToStorage(updatedItems);
    }
  }

  removeFromCart(pokemonId: number): void {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter((item) => item.id !== pokemonId);
    this.cartItems.set(updatedItems);
    this.saveToStorage(updatedItems);
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveToStorage([]);
  }

  isInCart(pokemonId: number): boolean {
    return this.cartItems().some((item) => item.id === pokemonId);
  }

  getCartCount(): number {
    return this.cartItems().length;
  }

  private loadFromStorage(): Pokemon[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
    return [];
  }

  private saveToStorage(items: Pokemon[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      }
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }
}
