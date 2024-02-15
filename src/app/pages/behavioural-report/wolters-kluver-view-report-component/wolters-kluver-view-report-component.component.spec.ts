import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoltersKluverViewReportComponentComponent } from './wolters-kluver-view-report-component.component';

describe('WoltersKluverViewReportComponentComponent', () => {
  let component: WoltersKluverViewReportComponentComponent;
  let fixture: ComponentFixture<WoltersKluverViewReportComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoltersKluverViewReportComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoltersKluverViewReportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
