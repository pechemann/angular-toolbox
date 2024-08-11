/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LOG_ERROR_STRING, LOG_INFO_STRING, LOG_WARNING_STRING } from "projects/angular-toolbox/src/public-api";

describe('Log constants', () => {
  
  it('LOG_STRING constant should be equal to "INFO"', () => {
    expect(LOG_INFO_STRING).toBe("INFO");
  });

  it('WARNING_STRING constant should be equal to "WARNING"', () => {
    expect(LOG_WARNING_STRING).toBe("WARNING");
  });

  it('ERROR_STRING constant should be equal to "ERROR"', () => {
    expect(LOG_ERROR_STRING).toBe("ERROR");
  });
});
