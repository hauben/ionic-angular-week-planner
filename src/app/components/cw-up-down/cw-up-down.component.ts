import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cw-up-down',
  standalone: true,
  templateUrl: './cw-up-down.component.html',
  styleUrls: ['./cw-up-down.component.scss'],
})
export class CwUpDownComponent {

@Input() week: number | undefined;
@Output() currentWeekEvent: EventEmitter<number> = new EventEmitter<number>();


publishCurrentWeek() {
  this.currentWeekEvent.emit(this.week);  // emit the current week
}

downWeek() {
  if (this.week) {
      if (this.week>=2) {
        this.week = this.week - 1;
      }
      else {
        this.week = 52;
      }
  }

  this.publishCurrentWeek();
}

upWeek() {
    if (this.week) {
        if (this.week<=51) {
          this.week = this.week + 1;
        }
        else {
          this.week = 1;
        }
    }

    this.publishCurrentWeek();
}

}
