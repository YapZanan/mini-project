import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterBar } from './pokemon-filter-bar';

describe('PokemonFilterBar', () => {
  let component: PokemonFilterBar;
  let fixture: ComponentFixture<PokemonFilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonFilterBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFilterBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
