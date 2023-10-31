import { Component, Input, OnInit } from '@angular/core';
import { TodoTask } from '../todo-task.model';
import { fadeAnimation } from '../animations'; // Import the animation
import { CommonModule } from '@angular/common';
import { IonButton, IonInput, IonContent, IonList, IonLabel, IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Import FormsModule

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
            FormsModule],
})
export class TodoListComponent  implements OnInit {

  constructor() { }

  @Input() year: number = 2023;
  @Input() week: number | undefined;
  tasks: TodoTask[] = [];
  newTaskName: string = '';
  errorMessage: string = '';
  localStorageKey: string = ""

  ngOnInit() {
    // Define a localStorage key to identify todos for each calendar week
    this.localStorageKey = `todos_${this.year}_${this.week}`;
   
    // Load saved todos when the component initializes
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

  private saveTodos() {
    // Save the list of todos to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  private loadSavedTodos() {
    
    // Load saved todos from localStorage
    const savedTodos = localStorage.getItem(this.localStorageKey);
    if (savedTodos) {
      this.tasks = JSON.parse(savedTodos);
    }
  }
   
}
