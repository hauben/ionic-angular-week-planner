import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Storage } from '@ionic/storage-angular';  // Import Ionic Storage

import { TodoItem } from '../models/todo.model';  // Import the TodoItem model

@Injectable({
  providedIn: 'root',
})
export class IonicStorageService {
  private todo_itemsSubject = new BehaviorSubject<TodoItem[]>([]);
  todo_items$: Observable<TodoItem[]> = this.todo_itemsSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this.loadTodoItemsFromStorage();
  }

  private async loadTodoItemsFromStorage() {
    try {
        const storedItems = await this.storage.get('items');
        const items = storedItems ? JSON.parse(storedItems) : [];
        this.todo_itemsSubject.next(items);
        console.log("loaded todos from storage");
    } catch (error) {
        console.error('Error loading items from storage:', error);
    }
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
      console.error('Error saving items to storage:', error);
    }
  }
}