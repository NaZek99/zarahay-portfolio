import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctComponent } from './conatct.component';

describe('ConatctComponent', () => {
  let component: ConatctComponent;
  let fixture: ComponentFixture<ConatctComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConatctComponent]
    });
    fixture = TestBed.createComponent(ConatctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
