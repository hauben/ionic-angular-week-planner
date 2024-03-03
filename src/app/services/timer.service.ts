import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: any;
  private seconds: number = 0;
  private minutes: number = 0;
  private hours: number = 0;

  startTimer(): number {

    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }, 1000);

    return Date.now();
  }

  stopTimer(): number {
    clearInterval(this.timer);
    return Date.now();
  }

  resetTimer(): void {
    clearInterval(this.timer);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  getTime(): string {
    return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
  }
}