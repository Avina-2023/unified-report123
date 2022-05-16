import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CandidateProfileComponent } from "./candidate-profile.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CandidateProfileComponent", () => {

  let fixture: ComponentFixture<CandidateProfileComponent>;
  let component: CandidateProfileComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CandidateProfileComponent]
    });

    fixture = TestBed.createComponent(CandidateProfileComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
