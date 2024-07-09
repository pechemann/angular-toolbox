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
import { TEST_SET, TestItem, TestSet } from "./test-config/test-set";
import { Key } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/model/key";

describe('toKeyRegexp', () => {

    /************************************************************************
     * We test this functionality with the following options only since they
     * are the only one used by the framework:
     ***********************************************************************/
    const stringify: Encode = toStringify(true, DEFAULT_DELIMITER);

    TEST_SET.forEach((set: TestSet) => {
        const result: any = toKeyRegexp(stringify, DEFAULT_DELIMITER);
        const keys: Key[] | undefined = set.keys;
        if (keys) {
            const expectedItems: TestItem[] = set.keyRegexpList as any;
            keys.forEach((key: Key, index: number) => {
                const testitem: TestItem = expectedItems[index];
                it(`${testitem.description} should match the key: ${JSON.stringify(key)}`, () => {
                    const rexexpString: string = result(key);
                    expect(rexexpString).toEqual(testitem.expected);
                });
            });
        }
    });
});