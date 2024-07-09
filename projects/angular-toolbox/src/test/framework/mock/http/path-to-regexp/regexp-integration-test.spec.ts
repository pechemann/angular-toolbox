/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TEST_SET, TestItem, TestSet } from "./test-config/test-set";

describe('RegExp Integration Test', () => {
    
    TEST_SET.forEach((set: TestSet) => {
        const path: string = set.path;
        const regepx: RegExp = new RegExp(set.regexpSource.expected);
        const testList = set.integrationTestList;
        if (testList) {
            testList.forEach((item: TestItem) => {
                const input: string = item.input;
                const expected: boolean = item.expected;
                it(`path=[${input}] should return [${expected}] with the route pattern [${path}] `, () => {
                    expect(regepx.test(item.input)).toEqual(expected);
                });
            });
        }
    });
});