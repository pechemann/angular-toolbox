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

import { EMPTY_STRING } from "../../../../util";
import { ASTERISK, CHAR, RIGHT_CURLY_BRACE, DEFAULT_DELIMITER, END, ESCAPED, NAME, LEFT_CURLY_BRACE, PATTERN } from "./constants";
import { escapeRegexpString } from "./escape-to-regexp-string";
import { Iter } from "./iter";
import { ParseOptions } from "./parse-options";
import { Token } from "./token";
import { TokenData } from "./token-data";
import { patternToKey } from "./pattern-to-key";
import { lexer } from "./lexer";
import { Encode } from "./encode";
import { RouteStringTokenizer } from "./route-string-tokenizer";

/**
 * @private
 * A NOOP `Endoder` function.
 * @param value The input string value.
 * @returns The input string value.
 */
const NOOP_VALUE: Encode = (value: string): string => value;

/**
 * @private
 * Parse a string for the raw tokens.
 */
export const stringToTokenData: RouteStringTokenizer = (str: string, options: ParseOptions = {}): TokenData => {
  const {
    prefixes = "./",
    delimiter = DEFAULT_DELIMITER,
    encodePath = NOOP_VALUE,
  } = options;
  const tokens: Token[] = [];
  const it: Iter = lexer(str);
  let keyIndex: number = 0;
  let path: string = EMPTY_STRING;

  do {
    const char: string | undefined = it.tryConsume(CHAR);
    const name: string | undefined = it.tryConsume(NAME);
    const pattern: string | undefined = it.tryConsume(PATTERN);

    if (name || pattern) {
      let prefix: string = char || EMPTY_STRING;
      const modifier: string | undefined = it.modifier();

      if (!prefixes.includes(prefix)) {
        path += prefix;
        prefix = EMPTY_STRING;
      }

      if (path) {
        tokens.push(encodePath(path));
        path = EMPTY_STRING;
      }

      tokens.push(
        patternToKey(
          encodePath,
          delimiter,
          name || String(keyIndex++),
          pattern,
          prefix,
          EMPTY_STRING,
          modifier,
        ),
      );
      continue;
    }

    const value: string | undefined = char || it.tryConsume(ESCAPED);
    if (value) {
      path += value;
      continue;
    }

    if (path) {
      tokens.push(encodePath(path));
      path = EMPTY_STRING;
    }

    const asterisk: string | undefined = it.tryConsume(ASTERISK);
    if (asterisk) {
      tokens.push(
        patternToKey(
          encodePath,
          delimiter,
          String(keyIndex++),
          `[^${escapeRegexpString(delimiter)}]*`,
          EMPTY_STRING,
          EMPTY_STRING,
          asterisk,
        ),
      );
      continue;
    }

    const open: string | undefined = it.tryConsume(LEFT_CURLY_BRACE);
    if (open) {
      const prefix: string = it.text();
      const name: string | undefined = it.tryConsume(NAME);
      const pattern: string | undefined = it.tryConsume(PATTERN);
      const suffix: string = it.text();

      it.consume(RIGHT_CURLY_BRACE);

      tokens.push(
        patternToKey(
          encodePath,
          delimiter,
          name || (pattern ? String(keyIndex++) : EMPTY_STRING),
          pattern,
          prefix,
          suffix,
          it.modifier(),
        ),
      );
      continue;
    }

    it.consume(END);
    break;
  } while (true);

  return new TokenData(tokens, delimiter);
}
