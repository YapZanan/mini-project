import { TestBed } from '@angular/core/testing';

import { PokemonList } from './PokemonService';

describe('PokemonService', () => {
  let service: PokemonList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
