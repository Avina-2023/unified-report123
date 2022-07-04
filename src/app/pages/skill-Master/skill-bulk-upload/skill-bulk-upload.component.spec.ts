import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBulkUploadComponent } from './skill-bulk-upload.component';

describe('SkillBulkUploadComponent', () => {
  let component: SkillBulkUploadComponent;
  let fixture: ComponentFixture<SkillBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillBulkUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
