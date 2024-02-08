import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderComponent } from './founder.component';

describe('FounderComponent', () => {
  let component: FounderComponent;
  let fixture: ComponentFixture<FounderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FounderComponent]
    });
    fixture = TestBed.createComponent(FounderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
