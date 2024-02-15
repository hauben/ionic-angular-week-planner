import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { filter, map } from 'rxjs/operators';
import { IonicStorageService } from '../../services/todo-storage.service';

import { TodoItem } from '../../models/todo.model';
import { Activity } from '../../models/activity.model';

import {
  secondsToDateString, 
  calculateDuration,
} from '../../helpers';

import {
  MatDialogRef,
} from '@angular/material/dialog';

export const FilterTypes = {
  TODAY: 'Today' as const,
  YESTERDAY: 'Yesterday' as const,
  THIS_WEEK: 'This Week' as const,
  LAST_WEEK: 'Last Week' as const,
  THIS_MONTH: 'This Month' as const,
  LAST_MONTH: 'Last Month' as const,
  THIS_YEAR: 'This Year' as const,
  ALL: 'All' as const,
  ALL_UNFILTERED: 'All (unfiltered)' as const,
};

export interface ActivityEntry {
  activity: string;
  start: string;
  end: string;
  duration: string;
}

@Component({
  selector: 'stats-dialog',
  templateUrl: 'stats-dialog.component.html',
  styleUrls: ['stats-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatTableModule
  ],
})
export class StatsDialogComponent implements OnInit {
  todo_items: TodoItem[] = [];

  // assign possible filters
  enumValues: (typeof FilterTypes[keyof typeof FilterTypes])[] = Object.values(FilterTypes);
  filters: string[] = this.enumValues;

  selectedActivity: string = '';
  error_message_activity: string = '';
  show_error_message: boolean = false;

  //  Example: {activity: 'MyActivity', start: '09.10.23 13:44', end: '09.10.23 15:44', duration: '02:00:00'},
  filteredActivities: ActivityEntry[] = [
  ];

  displayedColumns: string[] = ['activity', 'start', 'end', 'duration'];
  dataSource = new MatTableDataSource<ActivityEntry>([]);

  

  total: string = '00:00';

  activities: Activity[] = [];

  constructor(
    public dialogRef: MatDialogRef<StatsDialogComponent>,
    private ionicStorageService: IonicStorageService,
  ) {
      this.dataSource.data = this.filteredActivities;
  }

  ngOnInit(): void {
    this.readActivities();
  }

  async readTodos(activity: string) {
    this.filteredActivities = [];  // clear array first

    // search only for recorded todos with machting the selected activity
    this.ionicStorageService.todo_items$
      .pipe(
        filter( (todo_items: TodoItem[]) => !!todo_items), // Check if todo_items is not null or undefined
        map((todo_items: TodoItem[] | undefined) => todo_items?.filter(item => item.activity.name === activity) || [])
      )
      .subscribe((filteredTodoItems: TodoItem[]) => {
        this.todo_items = filteredTodoItems;
      });

      this.todo_items.forEach(time_based_todo_item => {
        time_based_todo_item.activity.sessions.forEach(session => {
         
          let entry = {
            activity: time_based_todo_item.activity.name,
            start: secondsToDateString(session.start),
            end: secondsToDateString(session.end),
            duration: calculateDuration(session.start, session.end)
          }

           this.filteredActivities.push(entry)    
        });
      
      });
     
      this.dataSource.data = this.filteredActivities;
}

 

  private async readActivities() {
     // read out all activies
     this.ionicStorageService.activity_items$.subscribe((activities: Activity[]) => {
          this.activities = activities;
     });
  }


  onBackClick(): void {
    this.dialogRef.close();
  }


  onActivitySelectionChange(event: MatSelectChange) {
    this.selectedActivity = event.value.name;
    this.show_error_message = false;

    this.readTodos(this.selectedActivity);
  }

  onFilterSelectionChange(event: MatSelectChange) {
  }
 
}