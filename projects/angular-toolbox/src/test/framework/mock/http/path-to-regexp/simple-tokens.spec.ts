/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { SIMPLE_TOKENS } from "../../../../../lib/framework/mock/http/path-to-regexp/model/simple-tokens";
import { ASTERISK, LEFT_CURLY_BRACE, RIGHT_CURLY_BRACE, PLUS, QUESTION_MARK } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";

describe('SIMPLE_TOKENS', () => {
  
    it('SIMPLE_TOKENS["!"] should be "!"', () => {
        expect(SIMPLE_TOKENS["!"]).toEqual("!");
    });
  
    it('SIMPLE_TOKENS["@"] should be "@"', () => {
        expect(SIMPLE_TOKENS["@"]).toEqual("@");
    });
  
    it('SIMPLE_TOKENS[";"] should be ";"', () => {
        expect(SIMPLE_TOKENS[";"]).toEqual(";");
    });
  
    it('SIMPLE_TOKENS["*"] should be "*"', () => {
        expect(SIMPLE_TOKENS["*"]).toEqual(ASTERISK);
    });
  
    it('SIMPLE_TOKENS["+"] should be "+"', () => {
        expect(SIMPLE_TOKENS["+"]).toEqual(PLUS);
    });
  
    it('SIMPLE_TOKENS["?"] should be "?"', () => {
        expect(SIMPLE_TOKENS["?"]).toEqual(QUESTION_MARK);
    });
  
    it('SIMPLE_TOKENS["{"] should be "{"', () => {
        expect(SIMPLE_TOKENS["{"]).toEqual(LEFT_CURLY_BRACE);
    });
  
    it('SIMPLE_TOKENS["}"] should be "}', () => {
        expect(SIMPLE_TOKENS["}"]).toEqual(RIGHT_CURLY_BRACE);
    });
});

