/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Lexer } from "../../../../../lib/framework/mock/http/path-to-regexp/model/lexer-type";
import { lexer } from "../../../../../lib/framework/mock/http/path-to-regexp/lexer";
import { MISSING_NAME_ERROR, MISSING_NAME_STRING, MISSING_PATTERN_ERROR, MISSING_PATTERN_STRING, NESTED_CAPTURING_GROUP_ERROR, NESTED_CAPTURING_GROUP_STRING, NON_CAPTURING_PATTERN_ERROR, NON_CAPTURING_PATTERN_STRING, UNBALANCED_PATTERN_ERROR, UNBALANCED_PATTERN_STRING } from "./test-config/test-errors";
import { TEST_SET, TestSet } from "./test-config/test-set";
import { Iter } from "../../../../../lib/framework/mock/http/path-to-regexp/iter";

describe('lexer', () => {

    let lx: Lexer = lexer;

    it("should throw on non-capturing pattern", () => {
        expect(()=> lx(NON_CAPTURING_PATTERN_STRING)).toThrow(NON_CAPTURING_PATTERN_ERROR);
    });

    it("should throw on nested capturing group", () => {
        expect(()=> lx(NESTED_CAPTURING_GROUP_STRING)).toThrow(NESTED_CAPTURING_GROUP_ERROR);
    });

    it("should throw on unbalanced pattern", () => {
        expect(()=> lx(UNBALANCED_PATTERN_STRING)).toThrow(UNBALANCED_PATTERN_ERROR);
    });

    it("should throw on missing pattern", () => {
        expect(()=> lx(MISSING_PATTERN_STRING)).toThrow(MISSING_PATTERN_ERROR);
    });

    it("should throw on missing name", () => {
        expect(()=> lx(MISSING_NAME_STRING)).toThrow(MISSING_NAME_ERROR);
    });

    it("should throw on missing name", () => {
        expect(()=> lx(MISSING_NAME_STRING)).toThrow(MISSING_NAME_ERROR);
    });

    TEST_SET.forEach((testDef: TestSet)=> {
        it(`path "${testDef.path}" should return valid instance of Iter class`, () => {
            expect(lx(testDef.path)).toBeInstanceOf(Iter);
        });
    });
});
