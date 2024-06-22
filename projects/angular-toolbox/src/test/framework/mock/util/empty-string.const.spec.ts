/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY_STRING } from '../../../../public-api';

describe('EMPTY_STRING', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  
  it('EMPTY_STRING constant should refer to an empty string', () => {
    expect(EMPTY_STRING).toBe("");
  });
});
