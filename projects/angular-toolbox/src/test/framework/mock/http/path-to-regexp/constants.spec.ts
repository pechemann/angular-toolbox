/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { ASTERISK, CHAR, COLON, DEFAULT_DELIMITER, END, ESCAPED, ESC_BACK_SLASH, G_FLAG, I_FLAG, LEFT_CURLY_BRACE, LEFT_PARENTHESIS, NAME, PATTERN, PLUS, QUESTION_MARK, RIGHT_CURLY_BRACE, RIGHT_PARENTHESIS } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";

describe('path-to-regexp constants', () => {
  
    it('DEFAULT_DELIMITER should be "/"', () => {
        expect(DEFAULT_DELIMITER).toEqual("/");
    });
  
    it('I_FLAG should be "i"', () => {
        expect(I_FLAG).toEqual("i");
    });

    it('G_FLAG should be "g"', () => {
        expect(G_FLAG).toEqual("g");
    });

    it('LEFT_CURLY_BRACE should be "{"', () => {
        expect(LEFT_CURLY_BRACE).toEqual("{");
    });

    it('RIGHT_CURLY_BRACE should be "}"', () => {
        expect(RIGHT_CURLY_BRACE).toEqual("}");
    });
    
    it('ASTERISK should be "*"', () => {
        expect(ASTERISK).toEqual("*");
    });

    it('PLUS should be "+"', () => {
        expect(PLUS).toEqual("+");
    });

    it('QUESTION_MARK should be "?"', () => {
        expect(QUESTION_MARK).toEqual("?");
    });
    
    it('NAME should be "NAME"', () => {
        expect(NAME).toEqual("NAME");
    });

    it('PATTERN should be "PATTERN"', () => {
        expect(PATTERN).toEqual("PATTERN");
    });

    it('CHAR should be "CHAR"', () => {
        expect(CHAR).toEqual("CHAR");
    });

    it('ESCAPED should be "ESCAPED"', () => {
        expect(ESCAPED).toEqual("ESCAPED");
    });

    it('END should be "END"', () => {
        expect(END).toEqual("END");
    });

    it('COLON should be ":"', () => {
        expect(COLON).toEqual(":");
    });

    it('LEFT_PARENTHESIS should be "("', () => {
        expect(LEFT_PARENTHESIS).toEqual("(");
    });

    it('RIGHT_PARENTHESIS should be ")"', () => {
        expect(RIGHT_PARENTHESIS).toEqual(")");
    });

    it('ESC_BACK_SLASH should be "\\"', () => {
        expect(ESC_BACK_SLASH).toEqual("\\");
    });
});

