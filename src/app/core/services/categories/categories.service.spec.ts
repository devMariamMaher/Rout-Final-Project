import { TestBed } from '@angular/core/testing';

import { CatigoriesService } from './categories.service';

describe('CatigoriesService', () => {
  let service: CatigoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatigoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
