import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from '../menu/left-menu/left-menu.component';
import { RightMenuComponent } from '../menu/right-menu/right-menu.component';
import { EventContentComponent } from '../menu/event-content/event-content.component';

@Component({
  selector: 'app-these',
  standalone: true,
  imports: [CommonModule,
    LeftMenuComponent,
    RightMenuComponent,
    EventContentComponent
  ],
  templateUrl: './these.component.html',
  styleUrls: ['./these.component.css']
})
export class TheseComponent {

}
