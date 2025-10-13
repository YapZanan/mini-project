import { Component, OnInit, signal, computed } from '@angular/core';
import { PokemonService } from '../../services/pokemon/PokemonService';
import { Pokemon } from '../../utils/pokemon.model';
import { PokemonFilterBar } from '../pokemon/pokemon-filter-bar/pokemon-filter-bar';
import { PokemonGrid } from '../pokemon/pokemon-grid/pokemon-grid';
import { PaginationControls } from '../pokemon/pagination-control/pagination-control';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonFilterBar, PokemonGrid, PaginationControls],
  templateUrl: './pokemon-list.html',
})
export class PokemonList implements OnInit {
  allPokemon = signal<Pokemon[]>([]);
  loadedPokemon = signal<Pokemon[]>([]);
  types = signal<string[]>([]);
  selectedType = signal<string>('');
  private _searchTerm = signal<string>('');
  page = signal<number>(0);
  pageSize = 24;
  isLoading = signal<boolean>(false);

  get search() {
    return this._searchTerm();
  }
  set search(value: string) {
    this._searchTerm.set(value);
  }

  filteredPokemon = computed(() =>
    this.loadedPokemon().filter(
      (p) =>
        (this._searchTerm() === '' ||
          p.name.toLowerCase().includes(this._searchTerm().toLowerCase())) &&
        (this.selectedType() === '' || p.types.includes(this.selectedType()))
    )
  );

  constructor(private readonly pokemonService: PokemonService) {}

  async ngOnInit() {
    await this.loadTypes();
    await this.loadPage();
  }

  async loadTypes() {
    const response = await this.pokemonService.getAllTypes();
    this.types.set(response.results.map((t) => t.name));
  }

  async loadPage() {
    const offset = this.page() * this.pageSize;
    const pokemon = await this.pokemonService.getAllPokemon(this.pageSize, offset);

    this.allPokemon.set(pokemon);
    this.loadedPokemon.update((prev) => {
      const newOnes = pokemon.filter((p) => !prev.some((x) => x.id === p.id));
      return [...prev, ...newOnes];
    });
  }

  async nextPage() {
    this.isLoading.set(true);
    this.page.update((v) => v + 1);
    await this.loadPage();
    this.isLoading.set(false);
  }

  async prevPage() {
    if (this.page() > 0) {
      this.isLoading.set(true);
      this.page.update((v) => v - 1);
      await this.loadPage();
      this.isLoading.set(false);
    }
  }
}
