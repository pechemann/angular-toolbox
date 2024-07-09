/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DEFAULT_DELIMITER } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/constants";
import { TEST_SET, TestSet } from "./test-config/test-set";
import { TokenData } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/token-data";
import { tokenDataToRegexp } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/token-data-to-regexp";

describe('tokenDataToRegexp', () => {

    TEST_SET.forEach((set: TestSet) => {
        const tokenData: TokenData = new TokenData(set.tokenList, DEFAULT_DELIMITER);
        const expected: string= set.regexpSource.expected;
        it(`tokens from the route ${set.path} should match the regexp ${expected}`, () => {
            /************************************************************************
             * We test this functionality with the following options only since they
             * are the only one used by the framework:
             ***********************************************************************/
            const regexp: RegExp = tokenDataToRegexp(tokenData, set.keys , {});
            expect(regexp.source).toEqual(expected);
        });
    });
});