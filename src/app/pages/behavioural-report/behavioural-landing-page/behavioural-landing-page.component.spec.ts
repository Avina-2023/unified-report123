import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviouralLandingPageComponent } from './behavioural-landing-page.component';

describe('BehaviouralLandingPageComponent', () => {
  let component: BehaviouralLandingPageComponent;
  let fixture: ComponentFixture<BehaviouralLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviouralLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
