/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 *
 * This source code is derived from the following original source code:
 * - https://github.com/pillarjs/path-to-regexp
 * - Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/pillarjs/path-to-regexp/blob/master/LICENSE
 */

import { Encode } from "./encode";

/**
 * @private
 */
const ESCAPE_REGEXP: RegExp = /([.+*?=^!:${}()[\]|/\\])/g;

/**
 * @private
 */
const ESCAPE_VALUE: string = "\\$1";

/**
 * @private
 * Escape a regular expression string.
 * 
 * @param str The regular expression string to escape.
 * @returns An escaped a regular expression string.
 */
export const escapeRegexpString: Encode = (str: string)=> {
  return str.replace(ESCAPE_REGEXP, ESCAPE_VALUE);
}
