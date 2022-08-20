import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BehaviouralReportCanvasComponent } from "./behavioural-report-canvas.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BehaviouralReportCanvasComponent", () => {

  let fixture: ComponentFixture<BehaviouralReportCanvasComponent>;
  let component: BehaviouralReportCanvasComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BehaviouralReportCanvasComponent]
    });

    fixture = TestBed.createComponent(BehaviouralReportCanvasComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
