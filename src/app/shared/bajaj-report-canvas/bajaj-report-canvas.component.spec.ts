import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajajReportCanvasComponent } from './bajaj-report-canvas.component';

describe('BajajReportCanvasComponent', () => {
  let component: BajajReportCanvasComponent;
  let fixture: ComponentFixture<BajajReportCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajajReportCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BajajReportCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
