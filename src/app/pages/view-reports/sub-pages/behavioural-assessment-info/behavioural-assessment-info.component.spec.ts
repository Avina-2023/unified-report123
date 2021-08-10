import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviouralAssessmentInfoComponent } from './behavioural-assessment-info.component';

describe('BehaviouralAssessmentInfoComponent', () => {
  let component: BehaviouralAssessmentInfoComponent;
  let fixture: ComponentFixture<BehaviouralAssessmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviouralAssessmentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralAssessmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
