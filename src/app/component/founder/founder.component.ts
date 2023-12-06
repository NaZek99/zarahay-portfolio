import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-founder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.css']
})
export class FounderComponent {

  @ViewChild('slideContainer')
  slideContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  nextSlide() {
    const lists = this.slideContainer.nativeElement.querySelectorAll('.item');
    const firstItem = lists[0];

    this.renderer.appendChild(this.slideContainer.nativeElement, firstItem);
  }
  prevSlide() {
    const lists = this.slideContainer.nativeElement.querySelectorAll('.item');
    this.renderer.insertBefore(
      this.slideContainer.nativeElement,
      lists[lists.length - 1],
      this.slideContainer.nativeElement.firstChild
    );
  }
} 
  
