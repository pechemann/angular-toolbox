/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The `LayoutRegionError` class represents an error thrown by layout components when manipulating
 * invalid regions of the container.
 */
export class LayoutRegionError extends Error {

    /**
     * Creates a new `LayoutRegionError` instance.
     * 
     * @param message A human-readable description of the error.
     */
    constructor(message: string) {
       super(message);
    }
}