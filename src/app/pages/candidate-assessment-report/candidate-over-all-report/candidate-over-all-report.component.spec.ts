import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOverAllReportComponent } from './candidate-over-all-report.component';

describe('CandidateOverAllReportComponent', () => {
  let component: CandidateOverAllReportComponent;
  let fixture: ComponentFixture<CandidateOverAllReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateOverAllReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateOverAllReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
