import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import  {TodoListItemComponent} from '../todo-list-item/todo-list-item.component';
import { CommonModule } from '@angular/common'; 

import { IonicStorageService } from '../../services/todo-storage.service';

import { TodoItem } from '../../models/todo.model';

import { filter } from 'rxjs/operators';

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
export class TodoListTableView implements OnInit {

  @Input() week: number | undefined;

  constructor(private ionicStorageService: IonicStorageService) { }

  todo_items: TodoItem[] = [];

  async ngOnInit() {

      // filter for todo items only for the current select calendar week
      this.ionicStorageService.todo_items$
        .pipe(
          filter( (todo_items: TodoItem[]) => !!todo_items), // Check if todo_items is not null or undefined
          filter( (todo_items: TodoItem[])  => todo_items.some(item => item.calendarWeek === this.week))
        )
        .subscribe((todo_items) => {
          this.todo_items = todo_items;
      });
  }

  onDeleteItem(itemID: number) {
    // delete the todo item from the storage
    this.ionicStorageService.removeItemById(itemID);
  }

}
