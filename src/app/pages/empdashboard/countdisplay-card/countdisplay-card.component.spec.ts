import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdisplayCardComponent } from './countdisplay-card.component';

describe('CountdisplayCardComponent', () => {
  let component: CountdisplayCardComponent;
  let fixture: ComponentFixture<CountdisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
