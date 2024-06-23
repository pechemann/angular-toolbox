/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */


import { EMPTY_STRING } from "../../../../../lib/util/empty-string.const";
import { I_FLAG } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";
import { getFlags } from "../../../../../lib/framework/mock/http/path-to-regexp/get-flags";

describe('getFlags()', () => {

    it('should return the I_FLAG constant when no options are specified', () => {
        expect(getFlags({})).toEqual(I_FLAG);
    });
    
    it('should return the I_FLAG constant when "sensitive" options is "false"', () => {
        expect(getFlags({ sensitive: false })).toEqual(I_FLAG);
    });
    
    it('should return the EMPTY_STRING constant when "sensitive" options is "true"', () => {
        expect(getFlags({ sensitive: true })).toEqual(EMPTY_STRING);
    });
});
