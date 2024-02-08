import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheseComponent } from './these.component';

describe('TheseComponent', () => {
  let component: TheseComponent;
  let fixture: ComponentFixture<TheseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TheseComponent]
    });
    fixture = TestBed.createComponent(TheseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
