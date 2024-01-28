import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'time-display',
  standalone: true,
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss'],
})
export class TimeDisplayComponent  implements OnInit {
  // goal timing info
  @Input() hours1: string = '00';
  @Input() minutes1: string = '00';

  // achieved timing info
  @Input() hours2: string = '00';
  @Input() minutes2: string = '00';
  @Input() seconds2: string = '00';

  constructor() { }

  ngOnInit() {}

}
