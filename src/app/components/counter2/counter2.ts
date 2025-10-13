import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter2',
  imports: [CommonModule],
  templateUrl: './counter2.html',
  styleUrl: './counter2.css',
})
export class CounterComponent2 {
  counter = 0;

  increment(value: number) {
    this.counter += value;
  }

  reset() {
    this.counter = 0;
  }
}
