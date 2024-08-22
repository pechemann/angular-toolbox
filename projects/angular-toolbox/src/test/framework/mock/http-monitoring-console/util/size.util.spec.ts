/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { SizeUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/size.util";

describe('SizeUtil', () => {

    it('getSize() should return a number that represents the size of the specified object', () => {
        expect(SizeUtil.getSize({ foo: "bar"} )).toEqual(jasmine.any(Number));
    });

    it('getSize() should return 0 when the object is null', () => {
        expect(SizeUtil.getSize(null)).toEqual(0);
    });

    it('sizeToString() should return a serialized number in bytes when the size is lower than 1024', () => {
        const expected: string = "860 B";
        const result: string = SizeUtil.sizeToString(860);
        expect(result).toEqual(expected);
    });
    
    it('sizeToString() should return a serialized number in kilo bytes when the size is greater than 1024 and lower than 1024 * 1024', () => {
        const expected: string = "860.00 KB";
        const result: string = SizeUtil.sizeToString(860 * 1024);
        expect(result).toEqual(expected);
    });
    
    it('sizeToString() should return a serialized number in Mega bytes when the size is greater than 1024 * 1024 * 1024', () => {
        const expected: string = "860.00 MB";
        const result: string = SizeUtil.sizeToString(860 * 1024 * 1024);
        expect(result).toEqual(expected);
    });
    
    it('sizeToString() should return a serialized number with only 2 decimals when the size is greater than 1024', () => {
        expect(SizeUtil.sizeToString(860.3698554 * 1024)).toEqual("860.37 KB");
        expect(SizeUtil.sizeToString(860.89284357 * 1024 * 1024)).toEqual("860.89 MB");
    });
});
