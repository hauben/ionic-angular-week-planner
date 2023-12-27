import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Storage } from '@ionic/storage-angular';  // Import Ionic Storage

import { TodoItem } from '../models/todo.model';  // Import the TodoItem model

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<TodoItem[]>([]);
  items$: Observable<TodoItem[]> = this.itemsSubject.asObservable();

  constructor() {
    this.loadItemsFromLocalStorage();
  }

  private loadItemsFromLocalStorage() {
    try {
      const storedItems = localStorage.getItem('todos');
      const items = storedItems ? JSON.parse(storedItems) : [];
      this.itemsSubject.next(items);
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
    }
  }

  addTodo(item: TodoItem) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.itemsSubject.next(updatedItems);
    this.saveTodosToLocalStorage(updatedItems);
  }

  private saveTodosToLocalStorage(items: TodoItem[]) {
    try {
      localStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to localStorage:', error);
    }
  }
}