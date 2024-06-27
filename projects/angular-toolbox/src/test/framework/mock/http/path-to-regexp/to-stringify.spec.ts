/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { toStringify } from "../../../../../lib/framework/mock/http/path-to-regexp/to-stringify";
import { escapeRegexpString } from "../../../../../lib/framework/mock/http/path-to-regexp/escape-to-regexp-string";
import { EMPTY_STRING } from "../../../../../public-api";
import { Encode } from "../../../../../lib/framework/mock/http/path-to-regexp/model/encode";

describe('toStringify', () => {
  
    it('should return a reference to the escapeRegexpString() method when the loose parameter is false', () => {
        expect(toStringify(false, EMPTY_STRING)).toEqual(escapeRegexpString);
    });
    
    it('should return a genuine Encode method when the loose parameter is true', () => {
        expect(toStringify(true, EMPTY_STRING)).not.toEqual(escapeRegexpString);
    });
    
    it('returned genuine Encode method should escape delimiter parameters', () => {
        const encode: Encode = toStringify(true, EMPTY_STRING)
        expect(encode("/test")).toEqual("\\/test");
    });
});

