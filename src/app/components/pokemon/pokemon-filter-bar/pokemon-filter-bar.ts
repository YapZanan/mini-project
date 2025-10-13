import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-filter-bar',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './pokemon-filter-bar.html',
})
export class PokemonFilterBar {
  @Input() types: string[] = [];
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
  @Input() selectedType = '';
  @Output() selectedTypeChange = new EventEmitter<string>();
}
