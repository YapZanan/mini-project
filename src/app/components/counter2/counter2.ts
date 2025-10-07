import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter2',
  imports: [CommonModule],
  templateUrl: './counter2.html',
  styleUrl: './counter2.css',
})
export class CounterComponent2 implements OnDestroy {
  counter = 0;
  isPlaying = false;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  increment(value: number) {
    this.counter += value;
  }

  pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.cdr.detectChanges();
  }

  reset() {
    this.pause();
    this.counter = 0;
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.pause();
  }
}
