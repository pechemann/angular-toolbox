/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
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
  constructor(private tokens: LexToken[]) {}

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
    throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}`);
  }

  /**
   * @private
   */
  public text(): string {
    let result = EMPTY_STRING;
    let value: string | undefined;
    while ((value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED"))) {
      result += value;
    }
    return result;
  }

  /**
   * @private
   */
  public modifier(): string | undefined {
    return this.tryConsume("?") || this.tryConsume("*") || this.tryConsume("+");
  }

  /**
   * @private
   */
  private peek(): LexToken {
    return this.tokens[this._index];
  }
}
