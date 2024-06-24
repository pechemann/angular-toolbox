/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 *
 * This source code is derived from the following original source code:
 * - https://github.com/pillarjs/path-to-regexp
 * - Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/pillarjs/path-to-regexp/blob/master/LICENSE
 */

import { LexToken } from "../../../../../lib/framework/mock/http/path-to-regexp/model/lex-token";
import { Iter } from "../../../../../lib/framework/mock/http/path-to-regexp/iter";
import { TEST_SET } from "./test-config/test-set";
import { EMPTY_STRING } from "../../../../../lib/util/empty-string.const";
import { END } from "../../../../../lib/framework/mock/http/path-to-regexp/constants";


describe('Iter', () => {

    const tokens: LexToken[] = (TEST_SET.find(set => set.path === "/test/:id(\\d+)") as any).tokens;
    let iter: Iter;

    beforeEach(()=> {
        iter = new Iter(tokens);
    });

    it(`should create a new instance`, () => {
        expect(new Iter(tokens)).toBeTruthy();
    });

    it(`tryConsume() should return a string`, () => {
        const result: string | undefined = iter.tryConsume(tokens[0].type);
        const expected: boolean = (typeof result === "string") || (result === undefined);
        expect(expected).toBeTrue();
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
    
    it(`final text() invokation should return the text part of token list from the specified index`, () => {
        const PATH: string = "/test/";
        expect(iter.text()).toEqual(PATH);
        iter = new Iter(tokens);
        iter.tryConsume(tokens[0].type);
        iter.tryConsume(tokens[1].type);
        expect(iter.text()).toEqual(PATH.substring(2));
    });
});