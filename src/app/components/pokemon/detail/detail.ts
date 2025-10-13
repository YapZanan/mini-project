import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../../services/pokemon/PokemonService';
import { LazyImageDirective } from '../../../shared/directives/lazy-image.directive';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyImageDirective],
  templateUrl: './detail.html',
})
export class PokemonDetails implements OnInit {
  pokemon: any = null;
  loading = true;
  isHovered = false;
  isBrowser: boolean = false;
  evolutionChain: string[] = [];

  typeColors: {
    [key: string]: { bg: string; text: string };
  } = {
    normal: { bg: 'bg-gray-400', text: 'text-gray-500' },
    fire: { bg: 'bg-red-500', text: 'text-red-500' },
    water: { bg: 'bg-blue-500', text: 'text-blue-500' },
    electric: { bg: 'bg-yellow-400', text: 'text-yellow-500' },
    grass: { bg: 'bg-green-500', text: 'text-green-500' },
    ice: { bg: 'bg-cyan-200', text: 'text-cyan-500' },
    fighting: { bg: 'bg-red-700', text: 'text-red-700' },
    poison: { bg: 'bg-purple-500', text: 'text-purple-500' },
    ground: { bg: 'bg-yellow-600', text: 'text-yellow-700' },
    flying: { bg: 'bg-indigo-300', text: 'text-indigo-500' },
    psychic: { bg: 'bg-pink-500', text: 'text-pink-500' },
    bug: { bg: 'bg-lime-500', text: 'text-lime-600' },
    rock: { bg: 'bg-gray-600', text: 'text-gray-600' },
    ghost: { bg: 'bg-indigo-700', text: 'text-indigo-700' },
    dragon: { bg: 'bg-purple-800', text: 'text-purple-800' },
    dark: { bg: 'bg-gray-800', text: 'text-gray-800' },
    steel: { bg: 'bg-gray-500', text: 'text-gray-500' },
    fairy: { bg: 'bg-pink-300', text: 'text-pink-400' },
    shadow: { bg: 'bg-gray-900', text: 'text-gray-900' },
    stellar: { bg: 'bg-indigo-900', text: 'text-indigo-900' },
    unknown: { bg: 'bg-gray-200', text: 'text-gray-400' },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      if (!id) return;

      this.loading = true;
      this.cdr.detectChanges();

      this.pokemon = await this.pokemonService.getPokemonById(id);
      const species = await this.pokemonService.getPokemonSpecies(id);
      const evolutions = await this.pokemonService.getEvolutionChain(species.toString());

      if (evolutions) {
        this.evolutionChain = evolutions;
      }

      if (this.pokemon?.sprites?.other?.['official-artwork']) {
        this.preloadSprites(this.pokemon.sprites.other['official-artwork']);
      }

      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  preloadSprites(sprites: any) {
    if (!this.isBrowser) return;
    const urls = [sprites.front_default, sprites.front_shiny];
    for (const url of urls) {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    }
  }

  playCry() {
    if (this.pokemon?.cries?.latest) {
      new Audio(this.pokemon.cries.latest).play();
    } else {
      alert('No cry available for this Pokémon.');
    }
  }

  back() {
    const page = history.state.page ?? 0;
    this.router.navigate(['/pokemon'], { state: { page } });
  }
}
