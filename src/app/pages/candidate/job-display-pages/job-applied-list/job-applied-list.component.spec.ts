/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobAppliedListComponent } from './job-applied-list.component';

describe('JobAppliedListComponent', () => {
  let component: JobAppliedListComponent;
  let fixture: ComponentFixture<JobAppliedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAppliedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAppliedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
