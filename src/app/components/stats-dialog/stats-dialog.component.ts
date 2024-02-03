import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { IonicStorageService } from '../../services/todo-storage.service';

import { TodoItem } from '../../models/todo.model';
import { ActivityItem } from '../../models/activity.model';

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

  testData: ActivityEntry[] = [
    {activity: 'MyActivity', start: '09.10.23 13:44', end: '09.10.23 15:44', duration: '02:00:00'},
    {activity: 'MyActivity2', start: '12.10.23 10:25', end: '12.10.23 10:50', duration: '00:25:00'},
  
  ];

  displayedColumns: string[] = ['activity', 'start', 'end', 'duration'];
  dataSource = this.testData;

  total: string = '02:25:00';

  constructor(
    public dialogRef: MatDialogRef<StatsDialogComponent>,
    private ionicStorageService: IonicStorageService
  ) {
  }

  ngOnInit(): void {
    this.readActivities();
  }

  activities: ActivityItem[] = [];

  private async readActivities() {
     // read out all activies
     this.ionicStorageService.activity_items$.subscribe((activities: ActivityItem[]) => {
          this.activities = activities;
     });
  }


  onBackClick(): void {
    this.dialogRef.close();
  }


  onActivitySelectionChange(event: MatSelectChange) {
    this.selectedActivity = event.value.name;
    this.show_error_message = false;
  }

  onFilterSelectionChange(event: MatSelectChange) {
  }
 
}