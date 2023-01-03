import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajBehaviouralCompetencyAreaComponent } from './bajaj-behavioural-competency-area.component';

describe('BajajBehaviouralCompetencyAreaComponent', () => {
  let component: BajajBehaviouralCompetencyAreaComponent;
  let fixture: ComponentFixture<BajajBehaviouralCompetencyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajajBehaviouralCompetencyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajBehaviouralCompetencyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
