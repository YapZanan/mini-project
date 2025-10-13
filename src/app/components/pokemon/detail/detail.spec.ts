import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetails } from './detail';

describe('Detail', () => {
  let component: PokemonDetails;
  let fixture: ComponentFixture<PokemonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
