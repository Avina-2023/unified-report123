import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOverallReportsComponent } from './view-overall-reports.component';

describe('ViewOverallReportsComponent', () => {
  let component: ViewOverallReportsComponent;
  let fixture: ComponentFixture<ViewOverallReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOverallReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOverallReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
