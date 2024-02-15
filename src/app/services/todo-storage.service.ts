import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular'; 

import { TodoItem } from '../models/todo.model';          // Import the TodoItem model
import { Activity } from '../models/activity.model';  // Import the Activity model

@Injectable({
  providedIn: 'root',
})
export class IonicStorageService {
  private todo_itemsSubject = new BehaviorSubject<TodoItem[]>([]);
  todo_items$: Observable<TodoItem[]> = this.todo_itemsSubject.asObservable();

  private activity_itemsSubject = new BehaviorSubject<Activity[]>([]);
  activity_items$: Observable<Activity[]> = this.activity_itemsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this.loadTodoItemsFromStorage();
    this.loadActivitiesFromStorage();
  }

  private async loadTodoItemsFromStorage() {
    try {
        const storedItems = await this.storage.get('items');
        const todos = storedItems ? JSON.parse(storedItems) : [];
        this.todo_itemsSubject.next(todos);
    } catch (error) {
        console.error('Error loading todos from storage:', error);
    }
  }

  private async loadActivitiesFromStorage() {
    try {
        const activityItems = await this.storage.get('activities');
        const activities = activityItems ? JSON.parse(activityItems) : [];
        this.activity_itemsSubject.next(activities);
    } catch (error) {
        console.error('Error loading activities from storage:', error);
    }
  }

  async addActivity(activity: Activity) {
    const currentItems = this.activity_itemsSubject.value;
    const updatedItems = [...currentItems, activity];
    this.activity_itemsSubject.next(updatedItems);

    await this.saveActivitiesToStorage(updatedItems);
  }

  async addTodoItem(item: TodoItem) {
    const currentItems = this.todo_itemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.todo_itemsSubject.next(updatedItems);

    await this.saveTodoItemsToStorage(updatedItems);
  }

  async removeItemById(itemId: number) {
    const currentTodos = this.todo_itemsSubject.value;
    const updatedTodos = currentTodos.filter((todo) => todo.id !== itemId);
    this.todo_itemsSubject.next(updatedTodos);

    await this.saveTodoItemsToStorage(updatedTodos);
  }

  async updateTodoItemById(itemId: number, updatedData: Partial<TodoItem>) {
    const currentItems = this.todo_itemsSubject.value;
    const updatedItems = currentItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...updatedData };
      } else {
        return item;
      }
    });

    this.todo_itemsSubject.next(updatedItems);
    await this.saveTodoItemsToStorage(updatedItems);
  }

  private async saveTodoItemsToStorage(items: TodoItem[]) {
    try {
      await this.storage.set('items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving todos to storage:', error);
    }
  }

  private async saveActivitiesToStorage(items: Activity[]) {
    try {
      await this.storage.set('activities', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving activities to storage:', error);
    }
  }
}