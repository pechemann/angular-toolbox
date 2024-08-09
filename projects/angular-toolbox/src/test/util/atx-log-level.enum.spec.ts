/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLogLevel } from '../../public-api';

describe('AtxLogLevel', () => {
  
  it('AtxLogLevel.LOG should be 0', () => {
    expect(AtxLogLevel.LOG).toEqual(0);
  });

  it('AtxLogLevel.LOG should be 1', () => {
    expect(AtxLogLevel.WARNING).toEqual(1);
  });

  it('AtxLogLevel.ERROR should be 2', () => {
    expect(AtxLogLevel.ERROR).toEqual(2);
  });
});
