import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cw-up-down',
  standalone: true,
  templateUrl: './cw-up-down.component.html',
  styleUrls: ['./cw-up-down.component.scss'],
})
export class CwUpDownComponent  implements OnInit {

  @Input() week: number | undefined;

  constructor() { }

  ngOnInit() {

  }

  downWeek() {
    console.log("down")
   if (this.week) {
      if (this.week>=2) {
        this.week = this.week - 1;
      }
      else {
        this.week = 52;
      }
   }
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
  }
}
