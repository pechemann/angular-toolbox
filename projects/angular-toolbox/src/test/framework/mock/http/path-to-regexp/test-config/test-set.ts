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

import { Key } from "../../../../../../lib/framework/mock/http/path-to-regexp/key";
import { EMPTY_STRING } from "../../../../../../lib/util";
import { LexToken } from "../../../../../../lib/framework/mock/http/path-to-regexp/lex-token";
import { ASTERISK, DEFAULT_DELIMITER, LEFT_CURLY_BRACE, PATTERN, PLUS, RIGHT_CURLY_BRACE } from "../../../../../../lib/framework/mock/http/path-to-regexp/constants";
import { CHAR, END, NAME, QUESTION_MARK } from "../../../../../../lib/framework/mock/http/path-to-regexp/constants";

export type ParamData = Partial<Record<string, string | string[]>>;

export interface TestSet {
    path: string;
    keys: Key[];
    tokens: LexToken[];
    parametricTests?: Array<{
        input: ParamData | undefined;
        expected: string | null;
    }>;
}

export const TEST_SET: TestSet[] = [
    {
        path:DEFAULT_DELIMITER,
        keys: [
            { name:DEFAULT_DELIMITER, prefix: EMPTY_STRING, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: END, index: 1, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:test",
        keys: [
            { name: "test", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: END, index: 6, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:test/",
        keys: [
            //{ name: "test", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: CHAR, index: 6, value: DEFAULT_DELIMITER },
            { type: END, index: 7, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:test?",
        keys: [

        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: QUESTION_MARK, index: 6, value: QUESTION_MARK },
            { type: END, index: 7, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:test(.*)",
        keys: [

        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: PATTERN, index: 10, value: '.*' },
            { type: END, index: 10, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:test*",
        keys: [

        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: ASTERISK, index: 6, value: ASTERISK },
            { type: END, index: 7, value: EMPTY_STRING }
        ]
    },
    {
        path: "{/:segment}+",
        keys: [

        ],
        tokens: [
            { type: LEFT_CURLY_BRACE, index: 0, value: LEFT_CURLY_BRACE },
            { type: CHAR, index: 1, value: DEFAULT_DELIMITER },
            { type: NAME, index: 10, value: "segment" },
            { type: RIGHT_CURLY_BRACE, index: 10, value: RIGHT_CURLY_BRACE },
            { type: PLUS, index: 11, value: PLUS },
            { type: END, index: 12, value: EMPTY_STRING }
        ]
    },
    {
        path: "/test/:id(\\d+)",
        keys: [

        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: CHAR, index: 1, value: 't' },
            { type: CHAR, index: 2, value: 'e' },
            { type: CHAR, index: 3, value: 's' },
            { type: CHAR, index: 4, value: 't' },
            { type: CHAR, index: 5, value: DEFAULT_DELIMITER },
            { type: NAME, index: 9, value: 'id' },
            { type: PATTERN, index: 14, value: '\\d+' },
            { type: END, index: 14, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:0",
        keys: [
            { name: "0", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 3, value: '0' },
            { type: END, index: 3, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:_",
        keys: [
            { name: "_", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 3, value: '_' },
            { type: END, index: 3, value: EMPTY_STRING }
        ]
    },
    {
        path: "/:café",
        keys: [
            { name: "café", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: EMPTY_STRING, modifier: EMPTY_STRING },
        ],
        tokens: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'café' },
            { type: END, index: 6, value: EMPTY_STRING }
        ]
    }
];

/*export const TEST_SET: TestSet[] = [
    {
        path:DEFAULT_DELIMITER,
        tests: [
            { input: undefined, expected:DEFAULT_DELIMITER },
            { input: {}, expected:DEFAULT_DELIMITER },
            { input: { id: "123" }, expected:DEFAULT_DELIMITER },
        ],
    },
    {
        path: "/test",
        tests: [
            { input: undefined, expected: "/test" },
            { input: {}, expected: "/test" },
            { input: { id: "123" }, expected: "/test" },
        ],
    },
    {
        path: "/test/",
        tests: [
            { input: undefined, expected: "/test/" },
            { input: {}, expected: "/test/" },
            { input: { id: "123" }, expected: "/test/" },
        ],
    },
    {
        path: "/:0",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { 0: "123" }, expected: "/123" },
        ],
    },
    {
        path: "/:test",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123%2Fxyz" },
        ],
    },
    {
        path: "/:test",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123%2Fxyz" },
        ],
    },
    {
        path: "/:test",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123/xyz" },
        ],
    },
    {
        path: "/:test",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123%2Fxyz" },
        ],
    },
    {
        path: "/:test",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: "123" }, expected: "/static" },
            { input: { test: "123/xyz" }, expected: "/static" },
        ],
    },
    {
        path: "/:test?",
        tests: [
            { input: undefined, expected: EMPTY_STRING },
            { input: {}, expected: EMPTY_STRING },
            { input: { test: undefined }, expected: EMPTY_STRING },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: null },
        ],
    },
    {
        path: "/:test(.*)",
        tests: [
            { input: undefined, expected: null },
            { input: {}, expected: null },
            { input: { test: EMPTY_STRING }, expected:DEFAULT_DELIMITER },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123/xyz" },
        ],
    },
    {
        path: "/:test*",
        tests: [
            { input: undefined, expected: EMPTY_STRING },
            { input: {}, expected: EMPTY_STRING },
            { input: { test: [] }, expected: EMPTY_STRING },
            { input: { test: [EMPTY_STRING] }, expected: null },
            { input: { test: ["123"] }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: null },
            { input: { test: ["123", "xyz"] }, expected: "/123/xyz" },
        ],
    },
    {
        path: "/:test*",
        tests: [
            { input: undefined, expected: EMPTY_STRING },
            { input: {}, expected: EMPTY_STRING },
            { input: { test: EMPTY_STRING }, expected: null },
            { input: { test: "123" }, expected: "/123" },
            { input: { test: "123/xyz" }, expected: "/123/xyz" },
            { input: { test: ["123", "xyz"] }, expected: null },
        ],
    },
];*/
