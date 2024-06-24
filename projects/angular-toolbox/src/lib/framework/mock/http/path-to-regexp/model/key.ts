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


/**
 * @private
 * A key is a capture group in a regex.
 */
export interface Key {
    
    /**
     * @private
     */
    name: string;

    /**
     * @private
     */
    prefix?: string;
    
    /**
     * @private
     */
    suffix?: string;
    
    /**
     * @private
     */
    pattern?: string;
    
    /**
     * @private
     */
    modifier?: string;
    
    /**
     * @private
     */
    separator?: string;
}
  