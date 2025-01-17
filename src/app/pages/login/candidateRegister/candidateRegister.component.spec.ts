import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekersComponent } from './candidateRegister.component';

describe('JobSeekersComponent', () => {
  let component: JobSeekersComponent;
  let fixture: ComponentFixture<JobSeekersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSeekersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
