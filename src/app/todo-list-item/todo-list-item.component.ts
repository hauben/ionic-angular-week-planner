import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item',
  standalone: true,
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  imports: [MatCheckboxModule, 
            MatIconModule,
  ]
})
export class TodoListItemComponent {
  @Input() title: string = '';
  isChecked: boolean = false;

  delete() {
    throw new Error('Method not implemented.');
  }

  edit() {
    throw new Error('Method not implemented.');
  }

  play() {
    throw new Error('Method not implemented.');
  }
}