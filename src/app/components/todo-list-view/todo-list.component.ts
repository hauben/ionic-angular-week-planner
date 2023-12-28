import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../../todo-task.model';
import { fadeAnimation } from '../../animations'; // Import the animation
import { CommonModule } from '@angular/common';
import { IonButton, IonInput, IonContent, IonList, IonLabel, IonItem, IonCheckbox } from '@ionic/angular/standalone';

import { Storage } from '@ionic/storage-angular';
import { ChangeDetectorRef } from '@angular/core';

import  {CwUpDownComponent} from '../cw-up-down/cw-up-down.component';
import  {TodoListTableView} from '../todo-list-table-view/todo-list-table-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {FormsModule} from '@angular/forms';


import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  animations: [fadeAnimation], // Include the animation in the component's metadata,
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
          ],
})
export class TodoListComponent  implements OnInit {
  animal: string = "";
  name: string = "";

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private storage: Storage, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  @Input() year: number = 2023;
  @Input() week: number | undefined;
  tasks: TodoTask[] = [];
  newTaskName: string = '';
  errorMessage: string = '';
  localStorageKey: string = ""

  async ngOnInit() {
    // Define a localStorage key to identify todos for each calendar week
    this.localStorageKey = `todos_${this.year}_${this.week}`;
   
    await this.storage.create();

    // Load saved todos for the specified calendar week when the component initializes
    this.loadSavedTodos();
  }




  addTask() {
    if (this.newTaskName.trim() === '') {
      this.errorMessage = ' Do not add empty tasks'; 
      return; // Don't add empty tasks
    }
    
    // Check if a task with the same name already exists
    const existingTask = this.tasks.find(task => task.name === this.newTaskName);
    if (existingTask) {
      this.errorMessage = 'Task with the same name already exists!';
      return;
    }
      
    const newTask = new TodoTask(this.newTaskName);

    this.tasks.unshift(newTask);
    this.newTaskName = ''; // Clear the input field
    this.errorMessage = ''; // Clear the error message

    // Ensure the completed property is set to false by default
    newTask.completed = false; // Set the completed property to false

    // Save the updated list of todos when a new task is added
    this.saveTodos();
  }

  // Function to update the status of a todo item when the checkbox is toggled
  updateTaskStatus(task: TodoTask) {
    console.log("updateTaskStatus")
    // Save the updated list of todos when a task's status is changed

    this.saveTodos();
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);

    this.saveTodos();
  }

  private async saveTodos() {
    // Save the list of todos to ionic storage
    await this.storage.set(this.localStorageKey, JSON.stringify(this.tasks));
  }

  private async loadSavedTodos() {
    
    const todosForCalendarWeek = await this.storage.get(this.localStorageKey);

    if (todosForCalendarWeek) {
      this.tasks = JSON.parse(todosForCalendarWeek);
    }

    this.cdr.detectChanges();  // manually trigger change detection
  }

  backToMainClicked() {
   console.log("back to main clicked");
   this.messageEvent.emit('back_to_main_clicked');
  }

  showAddTodoDialog() {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      height: '720px',
      width: '600px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
}
