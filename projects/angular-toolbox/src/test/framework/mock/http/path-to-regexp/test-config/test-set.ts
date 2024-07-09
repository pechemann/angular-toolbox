/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 *
 * This source code is derived from the following original source code:
 * - https://github.com/pillarjs/path-to-regexp
 * - Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/pillarjs/path-to-regexp/blob/master/LICENSE
 */

import { Key } from "../../../../../../lib/framework/mock/http/path-to-regexp/model/key";
import { EMPTY_STRING } from "../../../../../../lib/util";
import { LexToken } from "../../../../../../lib/framework/mock/http/path-to-regexp/model/lex-token";
import { ASTERISK, DEFAULT_DELIMITER, LEFT_CURLY_BRACE, PATTERN, PLUS, RIGHT_CURLY_BRACE } from "../../../../../../lib/framework/mock/http/path-to-regexp/constants";
import { CHAR, END, NAME, QUESTION_MARK } from "../../../../../../lib/framework/mock/http/path-to-regexp/constants";
import { Token } from "projects/angular-toolbox/src/lib/framework/mock/http/path-to-regexp/model/token";

export type ParamData = Partial<Record<string, string | string[]>>;

export interface TestItem {
    expected: any;
    description?: string;
    input?: any;
}

export interface TestSet {
    path: string;
    keys: Key[];
    lexTokenList: LexToken[];
    tokenList: Token[],
    integrationTestList?: TestItem[];
    keyRegexpList?: TestItem[];
    regexpSource: TestItem;
}

/**
 * The more use cases we have, the better test coverageg will be:
 * please add use cases here to complette.
 */
export const TEST_SET: TestSet[] = [
    {
        path: DEFAULT_DELIMITER,
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: END, index: 1, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER
        ],
        keys: [],
        regexpSource: { expected: "^\\/+(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: true },
            { input: "/foo", expected: false }
        ]
    },
    {
        path: "/:test",
        keys: [
            { name: "test", pattern: undefined }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: END, index: 6, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "test", pattern: undefined }
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <test>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: true },
            { input: "/573", expected: true },
            { input: "/foo/", expected: true },
            { input: "/foo/bar", expected: false }
        ]
    },
    {
        path: "/:test/",
        keys: [
            { name: "test", pattern: undefined }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: CHAR, index: 6, value: DEFAULT_DELIMITER },
            { type: END, index: 7, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "test", pattern: undefined },
            DEFAULT_DELIMITER
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <test>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))\\/+(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: false },
            { input: "/foo/", expected: true },
            { input: "/14/", expected: true },
            { input: "/foo/bar", expected: false }
        ]
    },
    {
        path: "/:test{/:bar}?",
        keys: [
            { name: "test", pattern: undefined },
            { name: "bar", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, modifier: QUESTION_MARK, separator: DEFAULT_DELIMITER }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: QUESTION_MARK, index: 6, value: QUESTION_MARK },
            { type: END, index: 7, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "test", pattern: undefined },
            { name: "bar", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, modifier: QUESTION_MARK, separator: DEFAULT_DELIMITER }
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <test>"},
            { expected: "(?:\\/+([^\\/]+?))?", description: "name <bar> with prefix </>, suffix <>, modifier <?> and separator </>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))(?:\\/+([^\\/]+?))?(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: true },
            { input: "/37", expected: true },
            { input: "/foo/bar", expected: true },
            { input: "/foo/bar/", expected: true },
            { input: "/56/215", expected: true },
            { input: "/foo/bar/test", expected: false }
        ]
    },
    {
        path: "/:test(.*)",
        keys: [
            { name: "test", pattern: ".*" }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: PATTERN, index: 10, value: '.*' },
            { type: END, index: 10, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "test", pattern: ".*" }
        ],
        keyRegexpList: [
            { expected: "(?:(.*))", description: "name <test> with pattern <[.*]>"}
        ],
        regexpSource: { expected: "^\\/+(?:(.*))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: true },
            { input: "/foo", expected: true },
            { input: "/foo/", expected: true },
            { input: "/foo/bar", expected: true },
            { input: "/128", expected: true },
            { input: "/128\ntest", expected: false }
        ]
    },
    {
        path: "/:test/*",
        keys: [
            { name: "test" },
            { name: "0", pattern: "[^/]*", modifier: ASTERISK, separator: DEFAULT_DELIMITER }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'test' },
            { type: ASTERISK, index: 6, value: ASTERISK },
            { type: END, index: 7, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "test" },
            DEFAULT_DELIMITER,
            { name: "0", pattern: "[^/]*", modifier: ASTERISK, separator: DEFAULT_DELIMITER }
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <test>"},
            { expected: "(?:((?:[^/]*)(?:\\/+(?:[^/]*))*))?", description: "name <0> with pattern <[^/]*>, modifier <*> and separator </>"},
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))\\/+(?:((?:[^/]*)(?:\\/+(?:[^/]*))*))?(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: false },
            { input: "/foo/", expected: true },
            { input: "/foo/bar", expected: true },
            { input: "/128", expected: false },
            { input: "/128/foo", expected: true },
            { input: "/128\ntest", expected: false }
        ]
    },
    {
        path: "{/:segment}+",
        keys: [
            { name: "segment", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: undefined, modifier: PLUS, separator: DEFAULT_DELIMITER }
        ],
        lexTokenList: [
            { type: LEFT_CURLY_BRACE, index: 0, value: LEFT_CURLY_BRACE },
            { type: CHAR, index: 1, value: DEFAULT_DELIMITER },
            { type: NAME, index: 10, value: "segment" },
            { type: RIGHT_CURLY_BRACE, index: 10, value: RIGHT_CURLY_BRACE },
            { type: PLUS, index: 11, value: PLUS },
            { type: END, index: 12, value: EMPTY_STRING }
        ],
        tokenList: [
            { name: "segment", prefix: DEFAULT_DELIMITER, suffix: EMPTY_STRING, pattern: undefined, modifier: PLUS, separator: DEFAULT_DELIMITER }
        ],
        keyRegexpList: [
            { expected: "(?:\\/+((?:[^\\/]+?)(?:\\/+(?:[^\\/]+?))*))", description: "name <segment> with prefix </>, suffix <>, pattern <undefined>, modifier<+> and separator</>"}
        ],
        regexpSource: { expected: "^(?:\\/+((?:[^\\/]+?)(?:\\/+(?:[^\\/]+?))*))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: true },
            { input: "/573", expected: true },
            { input: "/foo/bar", expected: true },
            { input: "/test/15", expected: true },
            { input: "/test/15/bar", expected: true }
        ]
    },
    {
        path: "/test/:id(\\d+)",
        keys: [
            { name: "id", pattern: "\\d+" }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: CHAR, index: 1, value: 't' },
            { type: CHAR, index: 2, value: 'e' },
            { type: CHAR, index: 3, value: 's' },
            { type: CHAR, index: 4, value: 't' },
            { type: CHAR, index: 5, value: DEFAULT_DELIMITER },
            { type: NAME, index: 9, value: 'id' },
            { type: PATTERN, index: 14, value: '\\d+' },
            { type: END, index: 14, value: EMPTY_STRING }
        ],
        tokenList: [
            "/test/",
            { name: "id", pattern: "\\d+" }
        ],
        keyRegexpList: [
            { expected: "(?:(\\\d+))", description: "name <id> with pattern <\d+>"}
        ],
        regexpSource: { expected: "^\\/+test\\/+(?:(\\d+))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: false },
            { input: "/573", expected: false },
            { input: "/test", expected: false },
            { input: "/foo/bar", expected: false },
            { input: "/test/", expected: false },
            { input: "/test/foo", expected: false },
            { input: "/test/15", expected: true },
            { input: "/test/15/", expected: true },
            { input: "/test/15/foo", expected: false },
            { input: "/test/15/37", expected: false }
        ]
    },
    {
        path: "/:0",
        keys: [
            { name: "0", pattern: undefined }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 3, value: '0' },
            { type: END, index: 3, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "0", pattern: undefined}
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <0>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: true },
            { input: "/573", expected: true },
            { input: "/foo/", expected: true },
            { input: "/foo/bar", expected: false }
        ]
    },
    {
        path: "/:_",
        keys: [
            { name: "_", pattern: undefined }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 3, value: '_' },
            { type: END, index: 3, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "_", pattern: undefined }
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <_>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/foo", expected: true },
            { input: "/573", expected: true },
            { input: "/foo/", expected: true },
            { input: "/foo/bar", expected: false }
        ]
    },
    {
        path: "/:café",
        keys: [
            { name: "café", pattern: undefined }
        ],
        lexTokenList: [
            { type: CHAR, index: 0, value: DEFAULT_DELIMITER },
            { type: NAME, index: 6, value: 'café' },
            { type: END, index: 6, value: EMPTY_STRING }
        ],
        tokenList: [
            DEFAULT_DELIMITER,
            { name: "café", pattern: undefined }
        ],
        keyRegexpList: [
            { expected: "(?:([^\\/]+?))", description: "name only <café>"}
        ],
        regexpSource: { expected: "^\\/+(?:([^\\/]+?))(?:\\/+)?$" },
        integrationTestList: [
            { input: DEFAULT_DELIMITER, expected: false },
            { input: "/brésil", expected: true },
            { input: "/brésil/", expected: true },
            { input: "/14-brésil/", expected: true },
            { input: "/brésil/14", expected: false }
        ]
    }
];
