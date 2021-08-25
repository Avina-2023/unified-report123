import { TestBed } from '@angular/core/testing';

import { IsAccessGuard } from './is-access.guard';

describe('IsAccessGuard', () => {
  let guard: IsAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
