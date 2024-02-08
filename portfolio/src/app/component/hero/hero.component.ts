import { Component, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})


export class HeroComponent {

  slideIndex = 1;
  slides = [
    { image: "../../../assets/image/gorbache.jpg", caption: "description de l'image 1" },
    { image: '../../../assets/image/asian.jpg', caption: "description de l'image 2" },
    { image: '../../../assets/image/reunion.jpg', caption: "description de l'image 3" }
  ];

  dots = Array(this.slides.length).fill(0); // Crée un tableau de longueur du tableau slides et le rempli par des zéros

  stopAutoPlay$ = new Subject<void>();
  autoPlayInterval$: Subscription | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.initializeAutoPlay();
  }

  initializeAutoPlay(): void {
    this.stopAutoPlay$ = new Subject<void>();
    this.autoPlayInterval$ = interval(10000).pipe(takeUntil(this.stopAutoPlay$)).subscribe(() => this.plusSlides(1));
 }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number): void {
    this.stopAutoPlay$.next();
    this.showSlides(this.slideIndex += n);
    this.initializeAutoPlay();
  }

  showSlides(n: number): void {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    // Get all slides and dots
    const slides = this.el.nativeElement.querySelectorAll('.mySlides');
    const dots = this.el.nativeElement.querySelectorAll('.dot');

    // Hide all slides
    slides.forEach((slide: any) => {
      this.renderer.setStyle(slide, 'display', 'none');
    });

    // Remove "active" class from all dots
    dots.forEach((dot: any) => {
      this.renderer.removeClass(dot, 'active');
    });

    // Show the current slide and add "active" class to the current dot
    this.renderer.setStyle(slides[this.slideIndex - 1], 'display', 'block');
    this.renderer.addClass(dots[this.slideIndex - 1], 'active');
  }
}

