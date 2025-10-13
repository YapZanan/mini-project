import { Component, signal } from '@angular/core';
import { PokemonService } from '../../../services/pokemon/PokemonService';
import { Pokemon } from '../../../utils/pokemon.model';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-gacha',
  standalone: true,
  imports: [CommonModule, RouterModule, PokemonCard],
  templateUrl: './gacha.html',
  styleUrls: ['./gacha.css'],
})
export class PokemonGacha {
  pokemon = signal<Pokemon | null>(null);
  isLoading = signal(false);
  hasPulled = signal(false);

  constructor(private readonly pokemonService: PokemonService) {}

  async pullGacha() {
    this.isLoading.set(true);
    this.hasPulled.set(true);

    try {
      const randomPokemon = await this.pokemonService.getRandomPokemon();
      this.pokemon.set(randomPokemon);
    } catch (error) {
      console.error('Error pulling gacha:', error);
      this.pokemon.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  resetGacha() {
    this.pokemon.set(null);
    this.hasPulled.set(false);
    this.isLoading.set(false);
  }
}
