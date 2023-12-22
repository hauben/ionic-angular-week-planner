import { Component } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import  {TodoListItemComponent} from '../todo-list-item/todo-list-item.component';
import { CommonModule } from '@angular/common'; 

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
export class TodoListTableView  {

  todo_items = ['Item 1', 'Item 2', 'Item 3'];

  onDeleteItem(item: string) {
    // Remove the item from the array
    this.todo_items = this.todo_items.filter(i => i !== item);
  }

}
