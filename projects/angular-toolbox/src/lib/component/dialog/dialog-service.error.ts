/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The `DialogServiceError` class represents errors thrown by the ATX framework
 * when a dialog error occurs.
 */
export class DialogServiceError extends Error {

    /**
     * Creates a new `DialogServiceError` instance.
     * 
     * @param message The `message` data property is a human-readable description of this `DialogServiceError` instance.
     */
    constructor(message: string) {
        super(message);
    }
}