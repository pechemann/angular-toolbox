/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LexToken } from "../../../../../lib/framework/mock/http/path-to-regexp/model/lex-token";
import { Iter } from "../../../../../lib/framework/mock/http/path-to-regexp/iter";
import { TEST_SET } from "./test-config/test-set";
import { EMPTY_STRING } from "../../../../../lib/util/empty-string.const";
import { ASTERISK, END, PLUS, QUESTION_MARK } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";

describe('Iter', () => {

    const tokens: LexToken[] = (TEST_SET.find(set => set.path === "/test/:id(\\d+)") as any).lexTokenList;
    let iter: Iter;

    beforeEach(()=> {
        iter = new Iter(tokens);
    });

    it(`should create a new instance`, () => {
        expect(new Iter(tokens)).toBeTruthy();
    });

    it(`tryConsume() should return a string for matched tokens`, () => {
        const result: string | undefined = iter.tryConsume(tokens[0].type);
        expect(typeof result === "string").toBeTrue();
    });

    it(`tryConsume() should return a undefined when not matching tokens`, () => {
        const result: string | undefined = iter.tryConsume(END);
        expect(result).toBeUndefined();
    });

    it(`consecutive peek() invokations should return the same LexToken object`, () => {
        const result: LexToken = iter.peek();
        expect(iter.peek()).toEqual(result);
    });

    it(`consecutive tryConsume() invokations should change the LexToken object returned by the peek() method when type matches`, () => {
        // Make shure to select a test case from the set that matches the testing scenario
        const firstResult: LexToken = iter.peek();
        const token = tokens[0];
        expect(token.type).toEqual(firstResult.type);
        iter.tryConsume(token.type);
        const latResult: LexToken = iter.peek();
        expect(latResult).not.toEqual(firstResult);
    });

    it(`final tryConsume() invokation should return token with type equal to "END"`, () => {
        let last!: LexToken;
        tokens.forEach((token, index)=> {
            last = iter.peek();
            iter.tryConsume(token.type);
        });
        expect(last.type).toEqual(END);
    });
    
    it(`tryConsume() must not change peek() value when not matching tokens`, () => {
        const token: LexToken = iter.peek();
        iter.tryConsume(END);
        expect(iter.peek()).toEqual(token);
    });

    it(`final text() invokation should return the text part of token list from the specified index`, () => {
        const PATH: string = "/test/";
        expect(iter.text()).toEqual(PATH);
        iter = new Iter(tokens);
        iter.tryConsume(tokens[0].type);
        iter.tryConsume(tokens[1].type);
        expect(iter.text()).toEqual(PATH.substring(2));
    });
    
    it(`consume() should retrun a string when matching tokens`, () => {
        const result: string | undefined = iter.consume(tokens[0].type);
        expect(typeof result === "string").toBeTrue();
    });

    it(`consume() should throw an error when not matching tokens`, () => {
        const error: TypeError = new TypeError("Unexpected CHAR at 0, expected END: https://git.new/pathToRegexpError");
        expect(()=> iter.consume(END)).toThrow(error);
    });
    
    it(`modifier() should return an empyy string when peek() method returns a non modifier token`, () => {
        expect(iter.modifier()).toEqual(EMPTY_STRING);
    });
    
    it(`modifier() should return an asterisk (*) when peek() method returns a token of type of "asterisk" `, () => {
        iter = new Iter([ { type: ASTERISK, index: 0, value: ASTERISK }]);
        expect(iter.modifier()).toEqual(ASTERISK);
    });
    
    it(`modifier() should return a question mark (?) string when peek() method returns a token of type of "question mark" `, () => {
        iter = new Iter([ { type: QUESTION_MARK, index: 0, value: QUESTION_MARK }]);
        expect(iter.modifier()).toEqual(QUESTION_MARK);
    });
    
    it(`modifier() should return a plus (+) when peek() method returns a token of type of "plus" `, () => {
        iter = new Iter([ { type: PLUS, index: 0, value: PLUS }]);
        expect(iter.modifier()).toEqual(PLUS);
    });
});
