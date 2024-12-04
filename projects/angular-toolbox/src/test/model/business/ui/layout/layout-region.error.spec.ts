/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EMPTY_STRING } from "projects/angular-toolbox/src/public-api";
import { LayoutRegionError } from "../../../../../lib/model";

describe('LayoutRegionError', () => {

    let error: LayoutRegionError;

    it('should create an instance', () => {
        error = new LayoutRegionError(EMPTY_STRING);
        expect(error).toBeTruthy();
    });
    
    it('should provide access to the message passed to the constructor parameter', () => {
        const errorMsg: string = "Custom error";
        error = new LayoutRegionError(errorMsg);
        expect(error.message).toEqual(errorMsg);
    });
});
