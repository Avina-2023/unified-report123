/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandingInstitutionalPartnerComponent } from './landing-InstitutionalPartner.component';

describe('LandingInstitutionalPartnerComponent', () => {
  let component: LandingInstitutionalPartnerComponent;
  let fixture: ComponentFixture<LandingInstitutionalPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingInstitutionalPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingInstitutionalPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
