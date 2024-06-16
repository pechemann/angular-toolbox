import { TestBed } from '@angular/core/testing';
import { EMPTY_STRING } from '../../public-api';

describe('EMPTY_STRING', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  
  it('EMPTY_STRING constant sould refer to an empty string', () => {
    expect(EMPTY_STRING).toBe("");
  });
});
