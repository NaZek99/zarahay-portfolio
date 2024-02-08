import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrouillonContentComponent } from './brouillon-content.component';

describe('BrouillonContentComponent', () => {
  let component: BrouillonContentComponent;
  let fixture: ComponentFixture<BrouillonContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrouillonContentComponent]
    });
    fixture = TestBed.createComponent(BrouillonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
