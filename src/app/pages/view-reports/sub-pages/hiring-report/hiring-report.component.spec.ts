import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringReportComponent } from './hiring-report.component';

describe('HiringReportComponent', () => {
  let component: HiringReportComponent;
  let fixture: ComponentFixture<HiringReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
