import { Component, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'time-display',
  standalone: true,
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  imports: [
    MatIconModule,
  ]
})
export class TimeDisplayComponent implements OnDestroy {
  // goal timing info
  @Input() hours1: string = '00';
  @Input() minutes1: string = '00';

  // achieved timing info
  @Input() hours2: string = '00';
  @Input() minutes2: string = '00';
  @Input() seconds2: string = '00';

  currentTime: string = '00:00:00';

  isTimeRunning: boolean = false;
  
  private interval: any;

  constructor(private timerService: TimerService, 
              private cdr: ChangeDetectorRef) { 
              
  }

  play_stop() {

    if (!this.isTimeRunning) {  // start the timer
      this.timerService.startTimer();

      this.interval = setInterval(() => {
          this.currentTime = this.timerService.getTime();
          this.cdr.detectChanges(); // Triggering change detection explicitly
      }, 1000);
    } else {  // stop the timer
      clearInterval(this.interval);
      this.currentTime = '00:00:00';
      this.timerService.resetTimer();
    }
   
    this.isTimeRunning = !this.isTimeRunning;  // switch the flag so that icon will change as well
  }

  stop(): void {
    this.timerService.stopTimer();
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  


}
