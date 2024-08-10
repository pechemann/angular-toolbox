/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ERROR_STRING, LOG_STRING, WARNING_STRING } from "projects/angular-toolbox/src/public-api";

describe('Log constants', () => {
  
  it('LOG_STRING constant should be equal to "LOG"', () => {
    expect(LOG_STRING).toBe("LOG");
  });

  it('WARNING_STRING constant should be equal to "WARNING"', () => {
    expect(WARNING_STRING).toBe("WARNING");
  });

  it('ERROR_STRING constant should be equal to "ERROR"', () => {
    expect(ERROR_STRING).toBe("ERROR");
  });
});
