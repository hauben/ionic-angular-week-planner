import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonInput, IonContent, IonList, IonLabel, IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { CwUpDownComponent } from '../cw-up-down/cw-up-down.component';
import { TodoListTableView } from '../todo-list-table-view/todo-list-table-view.component';
import { fadeAnimation } from '../../animations'; 
import { TodoItem } from '../../models/todo.model';

import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { StatsDialogComponent } from '../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  animations: [fadeAnimation],
  imports: [CommonModule, 
            IonButton, 
            IonContent, 
            IonList, 
            IonLabel, 
            IonInput, 
            IonItem, 
            IonCheckbox,
            FormsModule,
            CwUpDownComponent,
            TodoListTableView,
            MatButtonModule,
            MatIconModule,
            MatDialogModule
          ]
})
export class TodoListComponent {
  animal: string = "";
  name: string = "";
  todo_items: TodoItem[] = [];

  @Output() messageEvent = new EventEmitter<string>();
  @Output() updateTodoListEvent = new EventEmitter<void>();

  @ViewChild('todolist') todolist!: TodoListTableView;

  constructor(public dialog: MatDialog) { }

  @Input() year: number = 2023;
  @Input() week: number = 0;
  errorMessage: string = '';

  backToMainClicked() {
    this.messageEvent.emit('back_to_main_clicked');
  }


  showAddTodoDialog() {
      const dialogRef = this.dialog.open(AddTodoDialogComponent, {
        height: '700px',
        width: '700px',
        data: { week: this.week}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.updateTodoListEvent.emit();
        this.todolist.handleTodoListUpdateEvent();
      });
  }

  statsClicked() {
    const dialogRef = this.dialog.open(StatsDialogComponent, {
      height: '700px',
      width: '700px',
      data: { week: this.week}
    });

    dialogRef.afterClosed().subscribe(result => {
    
    });
}

  currentWeekEventReceived(week: number) {
     this.week = week;
  }
  
}
