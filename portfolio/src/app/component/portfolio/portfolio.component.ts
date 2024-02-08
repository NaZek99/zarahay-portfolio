import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { FounderComponent } from '../founder/founder.component';
import { ActivityComponent } from '../activity/activity.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { ConatctComponent } from '../conatct/conatct.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, 
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    FounderComponent,
    ActivityComponent,
    TestimonialComponent,
    ConatctComponent,
    RouterModule
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

}
