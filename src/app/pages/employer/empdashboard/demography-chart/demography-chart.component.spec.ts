import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographyChartComponent } from './demography-chart.component';

describe('DemographyChartComponent', () => {
  let component: DemographyChartComponent;
  let fixture: ComponentFixture<DemographyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographyChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
