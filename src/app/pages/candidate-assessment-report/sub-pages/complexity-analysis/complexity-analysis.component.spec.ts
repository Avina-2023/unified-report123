import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexityAnalysisComponent } from './complexity-analysis.component';

describe('ComplexityAnalysisComponent', () => {
  let component: ComplexityAnalysisComponent;
  let fixture: ComponentFixture<ComplexityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexityAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
