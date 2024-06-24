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
import { ASTERISK, RIGHT_CURLY_BRACE, DEFAULT_DELIMITER, END, NAME, LEFT_CURLY_BRACE, PATTERN, SEMI_COLON } from "./constants";
import { Iter } from "./iter";
import { ParseOptions } from "./parse-options";
import { Token } from "./token";
import { TokenData } from "./token-data";
import { lexer } from "./lexer";
import { Encode } from "./encode";
import { RouteStringTokenizer } from "./route-string-tokenizer";
import { LexToken } from "./lex-token";

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
    delimiter = DEFAULT_DELIMITER,
    encodePath = NOOP_VALUE,
  } = options;
  const tokens: Token[] = [];
  const it: Iter = lexer(str);
  let keyIndex: number = 0;

  do {
    const path: string = it.text();
    if (path) tokens.push(encodePath(path));
    const name: string | undefined = it.tryConsume(NAME);
    const pattern: string | undefined = it.tryConsume(PATTERN);
    if (name || pattern) {
      tokens.push({
        name: name || String(keyIndex++),
        pattern,
      });
      const next: LexToken = it.peek();
      if (next.type === ASTERISK) {
        throw new TypeError(
          `Unexpected * at ${next.index}, you probably want \`/*\` or \`{/:foo}*\`: https://git.new/pathToRegexpError`,
        );
      }
      continue;
    }
    const asterisk = it.tryConsume(ASTERISK);
    if (asterisk) {
      tokens.push({
        name: String(keyIndex++),
        pattern: `[^${escape(delimiter)}]*`,
        modifier: ASTERISK,
        separator: delimiter,
      });
      continue;
    }

    const open: string | undefined = it.tryConsume(LEFT_CURLY_BRACE);
    if (open) {
      const prefix: string = it.text();
      const name: string | undefined = it.tryConsume(NAME);
      const pattern: string | undefined = it.tryConsume(PATTERN);
      const suffix: string = it.text();
      const separator: string | undefined = it.tryConsume(SEMI_COLON) ? it.text() : prefix + suffix;

      it.consume(RIGHT_CURLY_BRACE);

      const modifier = it.modifier();

      tokens.push({
        name: name || (pattern ? String(keyIndex++) : EMPTY_STRING),
        prefix: encodePath(prefix),
        suffix: encodePath(suffix),
        pattern,
        modifier,
        separator,
      });
      continue;
    }

    it.consume(END);
    break;
  } while (true);

  return new TokenData(tokens, delimiter);
}
