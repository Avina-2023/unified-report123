import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationChartComponent } from './graduation-chart.component';

describe('GraduationChartComponent', () => {
  let component: GraduationChartComponent;
  let fixture: ComponentFixture<GraduationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraduationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
