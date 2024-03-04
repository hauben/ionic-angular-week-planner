import { Component, Input, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimerService } from '../../services/timer.service';
import { Session } from 'src/app/models/session';
import { IonicStorageService } from 'src/app/services/todo-storage.service';

@Component({
  selector: 'time-display',
  standalone: true,
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
  imports: [
    MatIconModule,
  ]
})
export class TimeDisplayComponent implements OnDestroy, OnInit {
  // goal timing info
  @Input() hours1: string = '00';
  @Input() minutes1: string = '00';

  // achieved timing info
  @Input() hours2: string = '00';
  @Input() minutes2: string = '00';
  @Input() seconds2: string = '00';

  @Input() week: number = 0;
  @Input() activity: string = '';
  @Input() activity_id: number = 0;

  currentTime: string = '00:00:00';
  achievedTime: string = '00:00:00';

  isTimeRunning: boolean = false;
  
  private interval: any;

  private startEpocheTimeInMs: number = 0;
  private endEpocheTimeInMs: number = 0;

  constructor(private timerService: TimerService, 
              private cdr: ChangeDetectorRef,
              private ionicStorageService: IonicStorageService) {               
  }

  ngOnInit(): void {
      console.log("ngOnInit")
      this.achievedTime =  this.ionicStorageService.sumUpSessions(this.activity_id);  // sum-up session time
  }

  private saveRecord() {
    let recordedSession:Session = {
      start: this.startEpocheTimeInMs,
      end: this.endEpocheTimeInMs
    }

    this.ionicStorageService.updateTodoItemByIdWithNewSession(this.activity_id, recordedSession);  // save session
    this.ionicStorageService.sumUpSessions(this.activity_id);  // sum-up session time
  }

  play_stop() {

    if (!this.isTimeRunning) {  // start the timer
      this.startEpocheTimeInMs = this.timerService.startTimer();

      this.interval = setInterval(() => {
          this.currentTime = this.timerService.getTime();
          this.cdr.detectChanges(); // Triggering change detection explicitly
      }, 1000);
    } else {  // stop the timer
      this.endEpocheTimeInMs =  this.timerService.stopTimer();
      clearInterval(this.interval);
      this.currentTime = '00:00:00';
      this.timerService.resetTimer();

      this.saveRecord();  // store the spend time for the activitiy
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
