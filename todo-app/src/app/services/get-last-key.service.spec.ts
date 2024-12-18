import { TestBed } from '@angular/core/testing';

import { GetLastKeyService } from './get-last-key.service';

describe('GetLastKeyService', () => {
  let service: GetLastKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLastKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
