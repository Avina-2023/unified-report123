import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveSettingsComponent } from './drive-settings.component';

describe('DriveSettingsComponent', () => {
  let component: DriveSettingsComponent;
  let fixture: ComponentFixture<DriveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
