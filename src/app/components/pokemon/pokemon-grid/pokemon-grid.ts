import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../utils/pokemon.model';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-grid',
  standalone: true,
  imports: [PokemonCard],
  templateUrl: './pokemon-grid.html',
})
export class PokemonGrid {
  @Input() pokemon: Pokemon[] = [];
}
