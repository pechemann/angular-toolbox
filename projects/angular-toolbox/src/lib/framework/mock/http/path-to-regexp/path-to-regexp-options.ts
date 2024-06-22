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

import { ParseOptions } from "./parse-options";

/**
 * @private
 * A set of options used to transform route definitions in regexp objects.
 */
export interface PathToRegexpOptions extends ParseOptions {

  /**
   * @private
   * When `true` the regexp will be case sensitive.
   * Default value is `false`.
   */
  sensitive?: boolean;

  /**
   * @private
   * Set characters to treat as "loose" and allow arbitrarily repeated.
   * Default value is `"/""`.
   */
  loose?: string;

  /**
   * @private
   * When `true` the regexp will match to the end of the string.
   * Default value is `true`.
   */
  end?: boolean;

  /**
   * @private
   * When `true` the regexp will match from the beginning of the string.
   * Default value is `true`.
   */
  start?: boolean;
  
  /**
   * @private
   * When `true` the regexp allows an optional trailing delimiter to match.
   * Default value is `true`.
   */
  trailing?: boolean;
}
