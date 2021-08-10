import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviouralQualityAreaComponent } from './behavioural-quality-area.component';

describe('BehaviouralQualityAreaComponent', () => {
  let component: BehaviouralQualityAreaComponent;
  let fixture: ComponentFixture<BehaviouralQualityAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviouralQualityAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralQualityAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
