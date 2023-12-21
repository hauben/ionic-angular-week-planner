import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import  {TimeDisplayComponent} from '../time-display/time-display.component';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  imports: [MatCheckboxModule, 
            MatIconModule,
            TimeDisplayComponent,
  ]
})
export class TodoListItemComponent {
  @Input() title: string = '';
  isChecked: boolean = false;
  elapsed_hours: string = "01"
  elapsed_minutes: string = "00"
  elapsed_seconds: string = "00"
  goal_hours: string = "02"
  goal_minutes: string = "00"
  goal_seconds: string = "00"

  delete() {
    console.log("delete clicked");
  }

  edit() {
    console.log("edit clicked");
  }

  play() {
    console.log("play clicked");
  }
}