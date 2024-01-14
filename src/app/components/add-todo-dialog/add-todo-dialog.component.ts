import { Component, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { IonicStorageService } from '../../services/todo-storage.service';


import { TodoItem } from '../../models/todo.model';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';


export interface DialogData {
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
export class AddTodoDialogComponent  {
  selectedColor: string  = "NO COLOR";
  @Input() hours_goal: Number = 0;
  @Input() minutes_goal: Number = 0;
  @Input() isDurationSelected : number | null = 0;
  @Input() newActivity : string = '';

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdr: ChangeDetectorRef,
    private ionicStorageService: IonicStorageService
  ) {
   
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    const todo: TodoItem =  {
      id: Date.now(), 
      calendarWeek: this.data.week,
      name: this.newActivity,
      color : this.selectedColor,
      isDone: false
    }

    this.ionicStorageService.addTodoItem(todo);

    this.dialogRef.close();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  onGroupChange(event: MatRadioChange) {
    console.log(event)
    this.isDurationSelected = event.value
    console.log(typeof( this.isDurationSelected))
    this.cdr.detectChanges();  // manually trigger change detection
  }
}