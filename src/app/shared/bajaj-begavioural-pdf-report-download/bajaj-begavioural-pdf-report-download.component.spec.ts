import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajBegaviouralPdfReportDownloadComponent } from './bajaj-begavioural-pdf-report-download.component';

describe('BajajBegaviouralPdfReportDownloadComponent', () => {
  let component: BajajBegaviouralPdfReportDownloadComponent;
  let fixture: ComponentFixture<BajajBegaviouralPdfReportDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajajBegaviouralPdfReportDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajBegaviouralPdfReportDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
