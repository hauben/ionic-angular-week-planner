import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [MatIconModule,MatCardModule]
})

export class AboutComponent {

  appName = 'WeekPlanner';
  appSubtitle = 'Angular based Ionic Week Planner';
  appVersion: string = "v 1.0";

  constructor(private router: Router) {
   
  }

  backButtonClicked() {
    this.router.navigate(['/home']); // Navigate to the 'home' route
  }

}
