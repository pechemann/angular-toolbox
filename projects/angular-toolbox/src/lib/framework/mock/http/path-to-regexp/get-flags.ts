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

import { EMPTY_STRING } from "../../../../util";
import { I_FLAG } from "./constants";

/**
 * @private
 * Get the flags for a regexp from the spcified options.
 * 
 * @param options The options used to determine the flags for a regexp.
 * @returns The flags for a regexp depending on the spcified options.
 */
export const getFlags: (options: { sensitive?: boolean })=> string = (options: { sensitive?: boolean }): string=> {
  return options.sensitive ? EMPTY_STRING : I_FLAG;
}
