import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { EventComponent } from '../event/event.component';
import { BrouillonContentComponent } from '../brouillon-content/brouillon-content.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,
    MenuComponent,
    EventComponent,
    BrouillonContentComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

}
