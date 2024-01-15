import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { filter, map } from 'rxjs/operators';

import { IonicStorageService } from '../../services/todo-storage.service';
import  {TodoListItemComponent} from '../todo-list-item/todo-list-item.component';
import { TodoItem } from '../../models/todo.model';

@Component({
  selector: 'todo-list-table-view',
  standalone: true,
  templateUrl: './todo-list-table-view.component.html',
  styleUrls: ['./todo-list-table-view.component.scss'],
  imports: [MatTabsModule, 
            MatIconModule,
            TodoListItemComponent,
            CommonModule
  ] 
})
export class TodoListTableView implements OnInit, OnChanges {

  @Input() week: number = 1;

  constructor(private ionicStorageService: IonicStorageService, private cdr: ChangeDetectorRef) { }

  todo_items: TodoItem[] = [];

  async readTodosForWeek(week: number) {
      // filter for todo items only for the current selected calendar week
      this.ionicStorageService.todo_items$
          .pipe(
            filter( (todo_items: TodoItem[]) => !!todo_items), // Check if todo_items is not null or undefined
            map((todo_items: TodoItem[] | undefined) => todo_items?.filter(item => item.calendarWeek === week) || [])
          )
          .subscribe((filteredTodoItems: TodoItem[]) => {
            this.todo_items = filteredTodoItems;
      });
  }

  async ngOnInit() {
    this.readTodosForWeek(this.week);
  }

  ngOnChanges(changes: SimpleChanges) {
    const newWeek = changes['week'].currentValue;
    
    this.week = newWeek;
    this.readTodosForWeek(this.week);
  }

  onDeleteItem(itemID: number) {
    // delete the todo item from the storage
    this.ionicStorageService.removeItemById(itemID);
  }

  onNameOfTodoChanged(eventData: {id: number, value: string }) {
    // update the storage item with the new title
    this.ionicStorageService.updateTodoItemById(eventData.id, { name: eventData.value });
  }

  onStatusOfTodoChanged(eventData: {id: number, checked: boolean }) {
      this.ionicStorageService.updateTodoItemById(eventData.id, { isDone: eventData.checked });
  }

  handleTodoListUpdateEvent()  {
    // re-read the storage
    console.log("re-read");
    this.readTodosForWeek(this.week);

    this.cdr.detectChanges();  // manually trigger change detection
  }

}
