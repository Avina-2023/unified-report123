import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviouralCompetencyAreasComponent } from './behavioural-competency-areas.component';

describe('BehaviouralCompetencyAreasComponent', () => {
  let component: BehaviouralCompetencyAreasComponent;
  let fixture: ComponentFixture<BehaviouralCompetencyAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviouralCompetencyAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviouralCompetencyAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
