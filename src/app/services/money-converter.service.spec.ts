import { TestBed } from '@angular/core/testing';

import { MoneyConverterService } from './money-converter.service';

describe('MoneyConverterService', () => {
  let service: MoneyConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
