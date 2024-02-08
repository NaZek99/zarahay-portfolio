import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  url = "../../../assets/image/reunion.jpg";
}
