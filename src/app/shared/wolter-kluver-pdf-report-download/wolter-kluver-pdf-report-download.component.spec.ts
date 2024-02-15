import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WolterKluverPdfReportDownloadComponent } from './wolter-kluver-pdf-report-download.component';

describe('WolterKluverPdfReportDownloadComponent', () => {
  let component: WolterKluverPdfReportDownloadComponent;
  let fixture: ComponentFixture<WolterKluverPdfReportDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WolterKluverPdfReportDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WolterKluverPdfReportDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
