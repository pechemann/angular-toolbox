/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogLevel } from '../../public-api';

describe('LogLevel', () => {
  
  it('LogLevel.LOG should be 0', () => {
    expect(LogLevel.LOG).toEqual(0);
  });

  it('LogLevel.LOG should be 1', () => {
    expect(LogLevel.WARNING).toEqual(1);
  });

  it('LogLevel.ERROR should be 2', () => {
    expect(LogLevel.ERROR).toEqual(2);
  });
});
