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
import { ASTERISK, CHAR, ESCAPED, PLUS, QUESTION_MARK } from "./constants";
import { LexToken } from "./lex-token";

/**
 * @private
 */
export class Iter {

  /**
   * @private
   */
  private _index: number = 0;

  /**
   * @private 
   */
  constructor(public readonly tokens: LexToken[]) {}

  /**
   * @private
   */
  public tryConsume(type: LexToken["type"]): string | undefined {
    const token: LexToken = this.peek();
    if (token.type !== type) return;
    this._index++;
    return token.value;
  }

  /**
   * @private
   */
  public consume(type: LexToken["type"]): string {
    const value: string | undefined = this.tryConsume(type);
    if (value !== undefined) return value;
    const { type: nextType, index } = this.peek();
    throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: https://git.new/pathToRegexpError`);
  }

  /**
   * @private
   */
  public text(): string {
    let result = EMPTY_STRING;
    let value: string | undefined;
    while ((value = this.tryConsume(CHAR) || this.tryConsume(ESCAPED))) {
      result += value;
    }
    return result;
  }

  /**
   * @private
   */
  public modifier(): string {
    return this.tryConsume(QUESTION_MARK) || this.tryConsume(ASTERISK) || this.tryConsume(PLUS) || EMPTY_STRING;
  }

  /**
   * @private
   */
  public peek(): LexToken {
    return this.tokens[this._index];
  }
}
