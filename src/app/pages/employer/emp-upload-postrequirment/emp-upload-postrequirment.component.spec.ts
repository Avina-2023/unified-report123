import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUploadPostrequirmentComponent } from './emp-upload-postrequirment.component';

describe('EmpUploadPostrequirmentComponent', () => {
  let component: EmpUploadPostrequirmentComponent;
  let fixture: ComponentFixture<EmpUploadPostrequirmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpUploadPostrequirmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpUploadPostrequirmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
