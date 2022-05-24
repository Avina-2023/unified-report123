import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAnalysisComponent } from './section-analysis.component';

describe('SectionAnalysisComponent', () => {
  let component: SectionAnalysisComponent;
  let fixture: ComponentFixture<SectionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
