import { Component, Inject, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

import { IonicStorageService } from '../../services/todo-storage.service';


import { TodoItem } from '../../models/todo.model';
import { ActivityItem } from '../../models/activity.model';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';


export interface DialogData  {
  week: number;
}

@Component({
  selector: 'add-todo-dialog',
  templateUrl: 'add-todo-dialog.component.html',
  styleUrls: ['add-todo-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule
  ],
})
export class AddTodoDialogComponent implements OnInit {
  selectedColor: string  = "white";
  @Input() hours_goal: number = 0;
  @Input() minutes_goal: number = 0;
  @Input() isDurationSelected: number = 0;
  @Input() newActivity : string = '';
  @Input() newTodo : string = '';

  todo_items: TodoItem[] = [];
  selectedActivity: string = '';
  error_message_activity: string = '';
  show_error_message: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdr: ChangeDetectorRef,
    private ionicStorageService: IonicStorageService
  ) {
   
  }
  ngOnInit(): void {
    this.readActivities();
  }

  activities: ActivityItem[] = [];

  async readActivities() {
     // read out all activies
     this.ionicStorageService.activity_items$.subscribe((activities: ActivityItem[]) => {
          this.activities = activities;
     });
  }


  onBackClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

   /* const todo: TodoItem =  {
      id: Date.now(), 
      calendarWeek: this.data.week,
      name: this.newTodo,
      color : this.selectedColor,
      isDone: false,
      isDurationBased: this.isDurationSelected,
      activity: this.newActivity,
      timegoal: {hours: this.hours_goal, minutes: this.minutes_goal}
    }

    this.ionicStorageService.addTodoItem(todo);*/

    if (this.isDurationSelected) {
      if ( (this.selectedActivity==='') && (this.newActivity==='')) {
        this.error_message_activity = "Select an activity or create a new one.";
        this.show_error_message = true;
      }
    }


    //this.dialogRef.close();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  onGroupChange(event: MatRadioChange) {
    this.isDurationSelected = event.value
    this.cdr.detectChanges();  // manually trigger change detection
  }

  onActivitySelectionChange(event: MatSelectChange) {
    this.selectedActivity = event.value;
    this.show_error_message = false;
  }

  onActivityInputChange(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length>0) {
       this.show_error_message = false;
    }
    else if (this.selectedActivity==='') {
      this.show_error_message = true;
    }
  }
}