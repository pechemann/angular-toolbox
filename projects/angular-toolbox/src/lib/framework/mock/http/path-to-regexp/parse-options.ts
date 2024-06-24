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

import { Encode } from "./encode";

/**
 * @private
 * A set of options used to parse routes.
 */
export interface ParseOptions {

  /**
   * @private
   * Set the default delimiter for repeat parameters.
   * Default value is `'/'`.
   */
  delimiter?: string;

  /**
   * @private
   * Function for encoding input strings for output into path.
   */
  encodePath?: Encode;
}
