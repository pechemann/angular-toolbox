/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DEFAULT_DELIMITER } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/constants";
import { Encode } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/model/encode";
import { toKeyRegexp } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/to-key-regexp";
import { toStringify } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/to-stringify";

describe('toKeyRegexp', () => {
  
    const stringify: Encode = toStringify(true, DEFAULT_DELIMITER);
    
    it('should', () => {
        const result: any = toKeyRegexp(stringify, DEFAULT_DELIMITER);
        console.log(result)
    });
});