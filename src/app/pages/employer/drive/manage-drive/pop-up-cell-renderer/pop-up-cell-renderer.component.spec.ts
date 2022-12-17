import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCellRendererComponent } from './pop-up-cell-renderer.component';

describe('PopUpCellRendererComponent', () => {
  let component: PopUpCellRendererComponent;
  let fixture: ComponentFixture<PopUpCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
