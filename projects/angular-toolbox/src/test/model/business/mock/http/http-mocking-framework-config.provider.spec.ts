/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockProductionPolicy, HTTP_MOCKING_FRAMEWORK_CONFIG } from 'projects/angular-toolbox/src/public-api';

describe('HTTP_MOCKING_FRAMEWORK_CONFIG', () => {

  it('HTTP_MOCKING_FRAMEWORK_CONFIG.disableVisualFlag should be false', () => {
    expect(HTTP_MOCKING_FRAMEWORK_CONFIG.disableVisualFlag).toBeFalse();
  });

  it('HTTP_MOCKING_FRAMEWORK_CONFIG.disableVisualFlag should be HttpMockProductionPolicy.ERROR', () => {
    expect(HTTP_MOCKING_FRAMEWORK_CONFIG.productionPolicy).toEqual(HttpMockProductionPolicy.ERROR);
  });
});
