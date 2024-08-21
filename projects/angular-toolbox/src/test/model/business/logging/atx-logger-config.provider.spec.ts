/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ATX_LOGGER_CONFIG } from "../../../../lib/model";

describe('ATX_LOGGER_CONFIG', () => {

  it('default logConnector should be undefined', () => {
    expect(ATX_LOGGER_CONFIG.logConnector).toBeUndefined();
  });
});