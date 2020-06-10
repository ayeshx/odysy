import { TestBed } from '@angular/core/testing';

import { DatabaseOpsService } from './database-ops.service';

describe('DatabaseOpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseOpsService = TestBed.get(DatabaseOpsService);
    expect(service).toBeTruthy();
  });
});
