/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { VERSION_CONFIG } from '../../../../lib/model/business/version/version-config.provider';

describe('DARK_MODE_CONFIG', () => {

  it('default major should be 0', () => {
    expect(VERSION_CONFIG.major).toEqual(0);
  });
  
  it('default minor should be 0', () => {
    expect(VERSION_CONFIG.minor).toEqual(0);
  });
  
  it('default patch should be 0', () => {
    expect(VERSION_CONFIG.patch).toEqual(0);
  });

  it('default buildTimestamp should be NaN', () => {
    expect(VERSION_CONFIG.buildTimestamp).toEqual(NaN);
  });

  it('default metada should be undefined', () => {
    expect(VERSION_CONFIG.metadata).toBeUndefined();
  });
});
