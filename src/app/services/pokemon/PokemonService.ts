import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonListResponse, PokemonListItem, Pokemon } from '../../utils/pokemon.model';

export interface PokemonTypeResponse {
  count: number;
  results: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon';
  private typeUrl = 'https://pokeapi.co/api/v2/type?offset=0&limit=30';
  private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';
  private evolutionUrl = 'https://pokeapi.co/api/v2/evolution-chain';
  constructor(private readonly http: HttpClient) {}

  async getAllPokemon(limit: number = 10, offset: number = 0): Promise<Pokemon[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<PokemonListResponse>(`${this.url}?limit=${limit}&offset=${offset}`)
      );

      const pokemonDetails = await Promise.all(
        response.results.map(async (p: PokemonListItem) => {
          try {
            const details: any = await firstValueFrom(this.http.get(p.url));
            return {
              id: details.id,
              name: details.name,
              sprite: details.sprites.front_default,
              types: details.types.map((t: any) => t.type.name),
            } as Pokemon;
          } catch {
            return null;
          }
        })
      );

      return pokemonDetails.filter((p): p is Pokemon => p !== null);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      return [];
    }
  }

  async getAllTypes(): Promise<PokemonTypeResponse> {
    try {
      const response = await firstValueFrom(this.http.get<PokemonTypeResponse>(this.typeUrl));
      return response;
    } catch (error) {
      console.error('Error fetching Pokémon types:', error);
      return { count: 0, results: [] };
    }
  }

  async getPokemonById(idOrName: string | number): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.url}/${idOrName}`));
      return response;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null;
    }
  }

  async getPokemonSpecies(idOrName: string | number): Promise<String> {
    try {
      const response = await firstValueFrom(
        this.http.get<PokemonSpecies>(`${this.speciesUrl}/${idOrName}`)
      );
      console.log(response.evolution_chain.url);
      return response.evolution_chain.url;
    } catch (error) {
      console.error('Error fetching Pokémon species:', error);
      return 'Error';
    }
  }

  async getEvolutionChain(url: string): Promise<string[] | null> {
    try {
      const response = await firstValueFrom(this.http.get<EvolutionChain>(url));

      const evolutionNames: string[] = [];

      const collectNames = (chainLink: EvolutionChainLink) => {
        evolutionNames.push(chainLink.species.name);
        chainLink.evolves_to.forEach((evolution) => {
          collectNames(evolution);
        });
      };

      collectNames(response.chain);
      console.log(evolutionNames);
      return evolutionNames;
    } catch (error) {
      console.error('Error fetching evolution chain names:', error);
      return null;
    }
  }
  async getRandomPokemon(): Promise<Pokemon | null> {
    try {
      const listResponse = await firstValueFrom(
        this.http.get<PokemonListResponse>(`${this.url}?limit=1`)
      );
      const totalCount = listResponse.count;

      const randomId = Math.floor(Math.random() * totalCount) + 1;

      const details: any = await firstValueFrom(this.http.get(`${this.url}/${randomId}`));
      return {
        id: details.id,
        name: details.name,
        sprite: details.sprites.front_default,
        types: details.types.map((t: any) => t.type.name),
      } as Pokemon;
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
      return null;
    }
  }
}
