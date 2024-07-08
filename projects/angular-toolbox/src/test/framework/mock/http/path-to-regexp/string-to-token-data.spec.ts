/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { stringToTokenData } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/string-to-token-data";
import { TokenData } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/token-data";
import { TEST_SET, TestSet } from "./test-config/test-set";
import { Token } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/model/token";
import { ASTERISK } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/constants";

describe('stringToTokenData', () => {
    
    TEST_SET.forEach((set: TestSet) => {
        it('should return the waited array of token data', () => {
            const path: string = set.path;
            const tokenData: TokenData = stringToTokenData(path);
            const resultArr: Token[] = tokenData.tokens;
            const expectedArr: Token[] = set.tokenList;
            expect(resultArr.length === expectedArr.length).toBeTrue();
            resultArr.every((token, index) => expect(token).toEqual(expectedArr[index]));
        });
    });

    it('should trhow an error when path endes with an asterisk character (*)', () => {
        const path: string = "/:key*";
        const idx: number = path.lastIndexOf(ASTERISK);
        const expected: TypeError = new TypeError(`Unexpected * at ${idx}, you probably want \`/*\` or \`{/:foo}*\`: https://git.new/pathToRegexpError`);
        expect(()=> stringToTokenData(path)).toThrow(expected);
    });
});