import { Component, Input } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import  {TimeDisplayComponent} from '../time-display/time-display.component';

@Component({
  selector: 'todo-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  imports: [MatCheckboxModule, 
            MatIconModule,
            TimeDisplayComponent,
            MatFormFieldModule
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
  isInputFieldDisabled: boolean = true;
  isTimeRunning: boolean = false;

  delete() {
    console.log("delete clicked");
  }

  edit() {
    console.log("edit clicked");

    if (!this.isInputFieldDisabled) {
      // TODO SAVE
      console.log("save");
    }

    // finally trigger the icon change
    this.isInputFieldDisabled = !this.isInputFieldDisabled;
  }

  play() {
    console.log("play clicked");

    this.isTimeRunning = !this.isTimeRunning;
  }

  onTodoChecked(event: MatCheckboxChange) {
    console.log("todo checked "+event.checked);


  }
}