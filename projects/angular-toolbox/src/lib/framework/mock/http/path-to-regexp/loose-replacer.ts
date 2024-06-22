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

import { escapeRegexpString } from "./escape";

/**
 * @private
 * Escape and repeat loose characters for regular expressions.
 * 
 * @param value The string expression to escape.
 * @param loose 
 * @returns The escaped string transfromed from the original string expression.
 */
export const looseReplacer: (substring: string, ...args: any[])=> string = (value: string, loose: string): string => {
  return loose ? `${escapeRegexpString(value)}+` : escapeRegexpString(value);
}
