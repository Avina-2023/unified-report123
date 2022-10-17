import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEnquiriesComponent } from './partner-enquiries.component';

describe('PartnerEnquiriesComponent', () => {
  let component: PartnerEnquiriesComponent;
  let fixture: ComponentFixture<PartnerEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerEnquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
