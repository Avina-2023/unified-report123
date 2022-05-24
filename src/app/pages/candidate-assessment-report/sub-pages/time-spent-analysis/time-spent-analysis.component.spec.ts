import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpentAnalysisComponent } from './time-spent-analysis.component';

describe('TimeSpentAnalysisComponent', () => {
  let component: TimeSpentAnalysisComponent;
  let fixture: ComponentFixture<TimeSpentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSpentAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSpentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
