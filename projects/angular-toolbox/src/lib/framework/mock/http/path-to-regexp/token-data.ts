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

import { Token } from "./token";

/**
 * @private
 * Tokenized path instance.
 */
export class TokenData {

  /**
   * @private
   * Creates a new `TokenData` instance.
   * 
   * @param tokens A list of `Token` objects.
   * @param delimiter the string delimiter for this `TokenData` instance.
   */
  constructor(public readonly tokens: Token[],
              public readonly delimiter: string) {}
}
