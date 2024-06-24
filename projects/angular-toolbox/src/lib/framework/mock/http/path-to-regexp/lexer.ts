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
import { ESC_BACK_SLASH, CHAR, COLON, END, ESCAPED, LEFT_PARENTHESIS, NAME, PATTERN, QUESTION_MARK, RIGHT_PARENTHESIS } from "./constants";
import { Iter } from "./iter";
import { LexToken } from "./lex-token";
import { Lexer } from "./lexer-type";
import { SIMPLE_TOKENS } from "./simple-tokens";
import { TokenType } from "./token-type";

/**
 * @private
 */
const ID_CHAR: RegExp = /^\p{XID_Continue}$/u;

/**
 * @private
 * A lexer method that tokenizes input string.
 * 
 * @param str The string expression to analyse.
 * @returns A new `Iter`object instance built from the specified input string.
 */
export const lexer: Lexer = (str: string): Iter => {
  const chars: string[] = [...str];
  const tokens: LexToken[] = [];
  let i: number = 0;

  while (i < chars.length) {
    const value: string = chars[i];
    const type: TokenType = SIMPLE_TOKENS[value];

    if (type) {
      tokens.push({ type, index: i++, value });
      continue;
    }

    if (value === ESC_BACK_SLASH) {
      tokens.push({ type: ESCAPED, index: i++, value: chars[i++] });
      continue;
    }

    if (value === COLON) {
      let name: string = EMPTY_STRING;

      while (ID_CHAR.test(chars[++i])) {
        name += chars[i];
      }

      if (!name) {
        throw new TypeError(`Missing parameter name at ${i}`);
      }

      tokens.push({ type: NAME, index: i, value: name });
      continue;
    }

    if (value === LEFT_PARENTHESIS) {
      const pos: number = i++;
      let count: number = 1;
      let pattern: string = EMPTY_STRING;

      if (chars[i] === QUESTION_MARK) {
        throw new TypeError(`Pattern cannot start with "?" at ${i}`);
      }

      while (i < chars.length) {
        if (chars[i] === ESC_BACK_SLASH) {
          pattern += chars[i++] + chars[i++];
          continue;
        }

        if (chars[i] === RIGHT_PARENTHESIS) {
          count--;
          if (count === 0) {
            i++;
            break;
          }
        } else if (chars[i] === LEFT_PARENTHESIS) {
          count++;
          if (chars[i + 1] !== QUESTION_MARK) {
            throw new TypeError(`Capturing groups are not allowed at ${i}`);
          }
        }

        pattern += chars[i++];
      }

      if (count) throw new TypeError(`Unbalanced pattern at ${pos}`);
      if (!pattern) throw new TypeError(`Missing pattern at ${pos}`);

      tokens.push({ type: PATTERN, index: i, value: pattern });
      continue;
    }

    tokens.push({ type: CHAR, index: i, value: chars[i++] });
  }

  tokens.push({ type: END, index: i, value: EMPTY_STRING });
  
  return new Iter(tokens);
}
