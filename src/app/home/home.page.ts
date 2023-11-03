import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { getISOWeek} from 'date-fns';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {TodoListComponent} from '../todo-list/todo-list.component';

import { IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonContent, TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  constructor(private router: Router) {}

  showTodoList: boolean = false;
  selectedYear: number = 2023; 
  selectedWeek: number =  0; 
  currentDate: Date = new Date(); // Get the current date

  currentCalendarWeek: number = -1;

  async ngOnInit() {
    this.currentCalendarWeek = this.getCurrentCalendarWeek()
  }
  
  selectWeek(week: number) {
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

  showAboutPage() {
    this.router.navigate(['/about']); // Navigate to the 'about' route
  }

  isCurrentCalendarWeek(week:number): Boolean {
    return (week==this.getCurrentCalendarWeek())
  }






}