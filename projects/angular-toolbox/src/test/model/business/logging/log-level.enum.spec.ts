/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogLevel } from '../../../../public-api';

describe('LogLevel', () => {
  
  it('LogLevel.OFF should be 4', () => {
    expect(LogLevel.OFF).toEqual(4);
  });

  it('LogLevel.INFO should be 0', () => {
    expect(LogLevel.INFO).toEqual(0);
  });

  it('LogLevel.CONFIG should be 0', () => {
    expect(LogLevel.CONFIG).toEqual(1);
  });

  it('LogLevel.WARNING should be 1', () => {
    expect(LogLevel.WARNING).toEqual(2);
  });

  it('LogLevel.ERROR should be 2', () => {
    expect(LogLevel.ERROR).toEqual(3);
  });
});
