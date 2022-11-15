import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeChartComponent } from './degree-chart.component';

describe('DegreeChartComponent', () => {
  let component: DegreeChartComponent;
  let fixture: ComponentFixture<DegreeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
