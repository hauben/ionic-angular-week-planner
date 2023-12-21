import { Component } from '@angular/core';
import { IonIcon, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { informationCircleOutline, returnDownBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle]
})

export class AboutComponent {

  appName = 'WeekPlanner';
  appSubtitle = 'Angular based Ionic Week Planner';
  appVersion: string = "v 1.0";

  constructor(private router: Router) {
      addIcons({ informationCircleOutline, returnDownBackOutline });  // workaround to the ion-icons working
  }

  backButtonClicked() {
    this.router.navigate(['/home']); // Navigate to the 'home' route
  }

}
