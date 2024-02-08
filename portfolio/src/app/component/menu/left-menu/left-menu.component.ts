import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from 'src/app/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {

  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

}
