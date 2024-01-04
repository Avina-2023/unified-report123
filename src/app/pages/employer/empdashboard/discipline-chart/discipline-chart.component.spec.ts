import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineChartComponent } from './discipline-chart.component';

describe('DisciplineChartComponent', () => {
  let component: DisciplineChartComponent;
  let fixture: ComponentFixture<DisciplineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
