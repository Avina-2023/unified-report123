import { TestBed } from '@angular/core/testing';

import { IsloggedInGuard } from './islogged-in.guard';

describe('IsloggedInGuard', () => {
  let guard: IsloggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsloggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
