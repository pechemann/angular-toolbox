/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTP_MOCK_MAX_DELAY } from "projects/angular-toolbox/src/public-api";

describe('HTTP_MOCK_MAX_DELAY', () => {
  
  it('HTTP_MOCK_MAX_DELAY should be 10000', () => {
    expect(HTTP_MOCK_MAX_DELAY).toEqual(10000);
  });
});
