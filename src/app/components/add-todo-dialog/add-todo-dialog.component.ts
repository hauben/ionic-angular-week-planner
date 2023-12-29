import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
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
export class AddTodoDialogComponent {
  selectedColor: string | null = null;
  @Input() hours_goal: Number = 0;
  @Input() minutes_goal: Number = 0;
  @Input() isDurationSelected : number | null = 0;
  @Input() newActivity : String | null = "";

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdr: ChangeDetectorRef
  ) {}

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    console.log(`Selected color: ${color}`);
  }

  onGroupChange(event: MatRadioChange) {
    console.log(event)
    this.isDurationSelected = event.value
    console.log(typeof( this.isDurationSelected))
    this.cdr.detectChanges();  // manually trigger change detection
  }
}