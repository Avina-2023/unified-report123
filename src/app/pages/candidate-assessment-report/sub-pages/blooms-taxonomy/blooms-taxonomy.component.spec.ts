import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloomsTaxonomyComponent } from './blooms-taxonomy.component';

describe('BloomsTaxonomyComponent', () => {
  let component: BloomsTaxonomyComponent;
  let fixture: ComponentFixture<BloomsTaxonomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloomsTaxonomyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloomsTaxonomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
