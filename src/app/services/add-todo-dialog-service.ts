import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../components/add-todo-dialog/add-todo-dialog.component';

@Injectable({
  providedIn: 'root',
})

export class AddTodoListDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddTodoDialogComponent);
  }
}