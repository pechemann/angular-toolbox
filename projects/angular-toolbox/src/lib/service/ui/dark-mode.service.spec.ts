import { TestBed } from '@angular/core/testing';

import { DarkModeService, DARK_MODE_CONFIG } from './dark-mode.service';
import { DOCUMENT } from '@angular/common';

describe('DarkModeService', () => {
  let service: DarkModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG },
        { provide: DOCUMENT, useValue: document }
      ]}
    );
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
