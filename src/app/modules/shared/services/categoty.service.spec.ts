import { TestBed } from '@angular/core/testing';

import { CategotyService } from './categoty.service';

describe('CategotyService', () => {
  let service: CategotyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategotyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
