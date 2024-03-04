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
import { Session } from '../../models/session';

import {
  secondsToDateString, 
  calculateDuration,
  secondsToHhMmSs,
  isToday,
  isThisWeek,
  isLastMonth,
  isThisMonth,
  isLastWeek,
  isThisYear,
  isYesterday,
  getWeekOfYear
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
      private todo_items: TodoItem[] = [];  // holds all todos records for a given activity

      // assign possible filters
      enumValues: (typeof FilterTypes[keyof typeof FilterTypes])[] = Object.values(FilterTypes);
      filters: string[] = this.enumValues;

      selectedActivity: string = '';
      error_message_activity: string = '';
      show_error_message: boolean = false;

      //  Example: {activity: 'MyActivity', start: '09.10.23 13:44', end: '09.10.23 15:44', duration: '02:00:00'},
      filteredActivities: ActivityEntry[] = [
      ];

      displayedColumns: string[] = ['activity', 'start', 'end', 'week', 'duration'];
      dataSource = new MatTableDataSource<ActivityEntry>([]);

      total: string = '00:00';
      activities: Activity[] = [];

      defaultFilter = FilterTypes.ALL;

      constructor(
        public dialogRef: MatDialogRef<StatsDialogComponent>,
        private ionicStorageService: IonicStorageService,
      ) {
          this.dataSource.data = this.filteredActivities;
      }


      ngOnInit(): void {
        this.readActivities();
      }


      getWeek(startDate: string): number {
        // given string is e.g: '04.03.2024 16:46'
        
        const [datePart] = startDate.split(' ');
        const [day, month, year] = datePart.split('.');

        return getWeekOfYear(new Date(Number(year), Number(month) - 1, Number(day)));
      }  


      private async readTodos(activity: string) {
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

          let sessionsArray: Session[]= [];

          this.todo_items.forEach(time_based_todo_item => {
            time_based_todo_item.activity.sessions.forEach(session => {
            
              let entry = {
                activity: time_based_todo_item.activity.name,
                start: secondsToDateString(session.start),
                end: secondsToDateString(session.end),
                duration: calculateDuration(session.start, session.end)
              }

              sessionsArray.push(session)
              this.filteredActivities.push(entry)    
            });
          });

          // sum up all sessions and calculate total duration
          if (sessionsArray.length!=0) {
            this.total = this.sumUpDurationTime(sessionsArray);
          }
        
          this.dataSource.data = this.filteredActivities;
    }


    private sumUpDurationTime(sessions: Array<Session>) {
      let sum = 0;

      sessions.forEach( (session:Session) => {
        sum = sum + (session.end - session.start)
      });

      return secondsToHhMmSs(Math.round(sum/1000));
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


    private filterSessionsByCriteria(criteria: (session: Session) => boolean) {
      let sessionsArray: Session[] = []; 

      this.todo_items.forEach((item: TodoItem) => {
          item.activity.sessions.forEach(session => {
              if (criteria(session)) {
                  let entry = {
                      activity: item.activity.name,
                      start: secondsToDateString(session.start),
                      end: secondsToDateString(session.end),
                      duration: calculateDuration(session.start, session.end)
                  };
  
                  sessionsArray.push(session);
                  this.filteredActivities.push(entry);
              }
          });
      });

      if (sessionsArray.length!=0) {
        this.total = this.sumUpDurationTime(sessionsArray);
      }
  }

    onFilterSelectionChange(filter: MatSelectChange) {
        this.filteredActivities = [];  // clear array first
        this.total = '00:00';

        switch (filter.value) {
            case FilterTypes.TODAY:
              this.filterSessionsByCriteria(session => isToday(session.start));
            break;

            case FilterTypes.YESTERDAY:
              this.filterSessionsByCriteria(session => isYesterday(session.start));
            break;
      
            case FilterTypes.THIS_WEEK:
              this.filterSessionsByCriteria(session => isThisWeek(session.start));
            break;

            case FilterTypes.LAST_WEEK:
              this.filterSessionsByCriteria(session => isLastWeek(session.start));
            break;

            case FilterTypes.THIS_MONTH:
              this.filterSessionsByCriteria(session => isThisMonth(session.start));
            break;

            case FilterTypes.LAST_MONTH:
              this.filterSessionsByCriteria(session => isLastMonth(session.start));
            break;
  
            case FilterTypes.THIS_YEAR:
              this.filterSessionsByCriteria(session => isThisYear(session.start));
            break;
          
            case FilterTypes.ALL:
              this.filterSessionsByCriteria(session => true); // No filtering needed for ALL
            break;
        }

        this.dataSource.data = this.filteredActivities;
    }
 
}