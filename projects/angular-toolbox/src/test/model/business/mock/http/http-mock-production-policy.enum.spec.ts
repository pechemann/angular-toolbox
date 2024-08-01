/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockProductionPolicy } from 'projects/angular-toolbox/src/public-api';

describe('HttpMockProductionPolicy', () => {

  it('HttpMockProductionPolicy.ERROR should be 2', () => {
    expect(HttpMockProductionPolicy.ERROR).toEqual(2);
  });

  it('HttpMockProductionPolicy.WARNING should be 1', () => {
    expect(HttpMockProductionPolicy.WARNING).toEqual(1);
  });

  it('HttpMockProductionPolicy.SILENT should be 0', () => {
    expect(HttpMockProductionPolicy.SILENT).toEqual(0);
  });
});
