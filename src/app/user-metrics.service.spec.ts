import { TestBed } from '@angular/core/testing';

import { UserMetricsService } from './user-metrics.service';

describe('UserMetricsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMetricsService = TestBed.get(UserMetricsService);
    expect(service).toBeTruthy();
  });
});
