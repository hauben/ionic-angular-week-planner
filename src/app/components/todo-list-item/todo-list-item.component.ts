import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import  {TimeDisplayComponent} from '../time-display/time-display.component';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'todo-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  imports: [MatCheckboxModule, 
            MatIconModule,
            TimeDisplayComponent,
            MatFormFieldModule,
            ReactiveFormsModule
  ]
})
export class TodoListItemComponent implements OnInit {

  @Input() title: string = '';
  @Input() id: number = -1;
  @Input() isInputFieldDisabled: boolean = true;
  @Input() isChecked: boolean = false;

  @Output() deleteItem = new EventEmitter<void>();
  @Output() nameOfTodoChanged: EventEmitter<{ id: number, value: string }> = new EventEmitter();
  @Output() statusOfTodoChanged: EventEmitter<{ id: number, checked: boolean }> = new EventEmitter();
 

  // Form group and form control
  reactiveForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form group with an input field
    this.reactiveForm = this.fb.group({
      userInput: [{ value: this.title, disabled: this.isInputFieldDisabled }]
    });
  }

  
  elapsed_hours: string = "01"
  elapsed_minutes: string = "00"
  elapsed_seconds: string = "00"
  goal_hours: string = "02"
  goal_minutes: string = "00"
  goal_seconds: string = "00"

  isTimeRunning: boolean = false;

  // Getter for easy access to the form control
  get userInputControl() {
     return this.reactiveForm.get('userInput');
  }

  delete() {
    this.deleteItem.emit();
  }

  // Toggle the disabled state of the input field
  toggleEdit() {
    const currentStatus = this.userInputControl?.disabled;

    if (currentStatus) {
      this.userInputControl?.enable();
    } else {
      this.userInputControl?.disable();
    }
  }

  edit() {
    this.toggleEdit();

    if (!this.isInputFieldDisabled) {  // save was clicked
      const id = this.id;
      const value = this.userInputControl?.value;

      this.nameOfTodoChanged.emit({id, value});
    }

    // finally trigger the icon change
    this.isInputFieldDisabled = !this.isInputFieldDisabled;
  }

  play() {
    console.log("play clicked");

    this.isTimeRunning = !this.isTimeRunning;
  }

  onTodoChecked(event: MatCheckboxChange) {
    const id = this.id;
    const checked = event.checked;

    this.statusOfTodoChanged.emit({id, checked});
  }
}