import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileOverviewComponent } from './candidate-profile-overview.component';

describe('CandidateProfileOverviewComponent', () => {
  let component: CandidateProfileOverviewComponent;
  let fixture: ComponentFixture<CandidateProfileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateProfileOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
