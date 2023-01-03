import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajViewReportComponent } from './bajaj-view-report.component';

describe('BajajViewReportComponent', () => {
  let component: BajajViewReportComponent;
  let fixture: ComponentFixture<BajajViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajajViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
