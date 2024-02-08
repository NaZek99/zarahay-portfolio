import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,
  ],
  animations: [
    trigger('scrollAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' })),
      ]),
    ]),
  ], 
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public showAnimation: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;

    // Adjust the value (300 in this case) based on when you want the animation to start
    if (scrollPosition > 100) {
      this.showAnimation = true;
    }
  }
}
