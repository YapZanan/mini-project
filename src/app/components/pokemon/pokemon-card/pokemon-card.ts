import { Component, Input, inject } from '@angular/core';
import { Pokemon } from '../../../utils/pokemon.model';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyImageDirective } from '../../../shared/directives/lazy-image.directive';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [TitleCasePipe, RouterModule, LazyImageDirective],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;
  private cartService = inject(CartService);

  typeColors: { [key: string]: string } = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-gray-600',
    ghost: 'bg-indigo-700',
    dragon: 'bg-purple-800',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    shadow: 'bg-gray-900',
    stellar: 'bg-indigo-900',
    unknown: 'bg-gray-200',
  };

  isInCart(): boolean {
    return this.cartService.isInCart(this.pokemon.id);
  }

  toggleCart(event: Event): void {
    event.stopPropagation();
    if (this.isInCart()) {
      this.cartService.removeFromCart(this.pokemon.id);
    } else {
      this.cartService.addToCart(this.pokemon);
    }
  }
}
