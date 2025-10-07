import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class CounterComponent implements OnDestroy {
  counter = 0;
  isPlaying = false;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  increment(value: number) {
    this.counter += value;
  }

  toggleTimer() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  play() {
    this.isPlaying = true;
    this.cdr.detectChanges();

    this.intervalId = setInterval(() => {
      if (this.counter <= 0) {
        this.reset();
        return;
      }

      this.counter--;
      this.cdr.detectChanges();
    }, 1000);
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
