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

/**
 * @private
 * Defines the type of tokens used to parse manipulate regexp objects.
 */
export type TokenType =
  | "{"
  | "}"
  | "*"
  | "+"
  | "?"
  | "NAME"
  | "PATTERN"
  | "CHAR"
  | "ESCAPED"
  | "END"
  // Reserved for use.
  | "!"
  | "@"
  | ";";