import { ViewCandidateProfilebyEmployerComponent } from './viewCandidateProfilebyEmployer.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ViewCandidateProfilebyEmployerComponent', () => {
  let component: ViewCandidateProfilebyEmployerComponent;
  let fixture: ComponentFixture<ViewCandidateProfilebyEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCandidateProfilebyEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidateProfilebyEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
