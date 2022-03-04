import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BehaviouralPdfReportDownloadComponent } from "./behavioural-pdf-report-download.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BehaviouralPdfReportDownloadComponent", () => {

  let fixture: ComponentFixture<BehaviouralPdfReportDownloadComponent>;
  let component: BehaviouralPdfReportDownloadComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BehaviouralPdfReportDownloadComponent]
    });

    fixture = TestBed.createComponent(BehaviouralPdfReportDownloadComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
