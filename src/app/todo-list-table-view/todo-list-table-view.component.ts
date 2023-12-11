import { Component, OnInit } from '@angular/core';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import  {TodoListItemComponent} from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'todo-list-table-view',
  standalone: true,
  templateUrl: './todo-list-table-view.component.html',
  styleUrls: ['./todo-list-table-view.component.scss'],
  imports: [MatTabsModule, 
            MatIconModule,
            TodoListItemComponent
  ] 
})
export class TodoListTableView  implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {}

}
