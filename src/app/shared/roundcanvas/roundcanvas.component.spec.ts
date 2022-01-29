import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundcanvasComponent } from './roundcanvas.component';

describe('RoundcanvasComponent', () => {
  let component: RoundcanvasComponent;
  let fixture: ComponentFixture<RoundcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundcanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
