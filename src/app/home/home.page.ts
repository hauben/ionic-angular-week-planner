import { Component } from '@angular/core';
import { IonHeader, IonContent } from '@ionic/angular/standalone';
import { getISOWeek, startOfYear, weeksToDays} from 'date-fns'; // Import date functions
import { ChangeDetectionStrategy, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {TodoListComponent} from '../todo-list/todo-list.component';

import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonButton, IonContent, TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  constructor(private elementRef: ElementRef) {}

  calendarWeeks: number[] = Array.from({ length: 52 }, (_, i) => i + 1); // Example calendar weeks
  showTodoList: boolean = false;
  selectedYear: number = 2023; 
  selectedWeek: number =  0; 
  currentDate: Date = new Date(); // Get the current date

  divCountRows = Array.from({ length: 9 }, (_, i) => i + 1);
  divCountColumnsTop = Array.from({ length: 6 }, (_, i) => i + 1);
  divCountColumnsBottom = Array.from({ length: 5 }, (_, i) => i + 1);

  indexCounter: number = 0;
  
  selectWeek(event: Event) {
    let week:number = 0;
    const target = event.target as HTMLElement;
    
    if (target instanceof HTMLElement) {
      week = parseInt(target.innerText);
    }

    this.showTodoList = true; 
    this.selectedYear = 2023; // Clear selectedYear when returning to calendar weeks
    this.selectedWeek = week; // Clear selectedWeek when returning to calendar weeks
  
}

  showCalendarWeeks() {
    this.showTodoList = false;
    this.selectedYear = 2023; // Clear selectedYear when returning to calendar weeks
    this.selectedWeek = 0; // Clear selectedMonth when returning to calendar weeks
  }

  
  // Function to calculate the current calendar week
  getCurrentCalendarWeek(): number {
    const currentDate = new Date();
    return  getISOWeek(currentDate);
  }

  getWeekNumber(): number {
  this.indexCounter = this.indexCounter+1;
  return this.indexCounter;
  }


  ngOnInit(): void {
  }


  ngAfterViewChecked(): void {
    this.indexCounter = 0;
  }

}