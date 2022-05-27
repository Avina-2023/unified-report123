import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInfoAndTestCountComponent } from './test-info-and-test-count.component';

describe('TestInfoAndTestCountComponent', () => {
  let component: TestInfoAndTestCountComponent;
  let fixture: ComponentFixture<TestInfoAndTestCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestInfoAndTestCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInfoAndTestCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
