import { TestBed } from '@angular/core/testing';

import { KeyboardCommandStrategyService } from '../../../lib/service/ui/keyboard-command-strategy.service';

describe('KeyboardStrategyService', () => {
  let service: KeyboardCommandStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardCommandStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
