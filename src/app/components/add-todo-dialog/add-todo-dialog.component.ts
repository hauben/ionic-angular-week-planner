import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'add-todo-dialog',
  templateUrl: 'add-todo-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
})
export class AddTodoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}