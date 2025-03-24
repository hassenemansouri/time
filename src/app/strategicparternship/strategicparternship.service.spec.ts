import { TestBed } from '@angular/core/testing';

import { StrategicparternshipService } from './strategicparternship.service';

describe('StrategicparternshipService', () => {
  let service: StrategicparternshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategicparternshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
