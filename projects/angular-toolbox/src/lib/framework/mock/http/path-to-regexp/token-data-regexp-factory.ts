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

import { Key } from "./key";
import { PathToRegexpOptions } from "./path-to-regexp-options";
import { TokenData } from "./token-data";

/**
 * @private
 * This interface defines the default API that must be implemented by `RegExp` factories based on `TokenData` collections.
 */
export type TokenDataRegExpFactory = (data: TokenData, keys: Key[], options: PathToRegexpOptions)=> RegExp;
