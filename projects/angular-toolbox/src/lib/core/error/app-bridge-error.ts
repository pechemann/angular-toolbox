/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 */
const NAME: string = "AppBridgeError";

/**
 * Represents exceptions thrown by the `AppBridge` class.
 */
export class AppBridgeError extends ReferenceError {

    /**
     * @private
     */
    constructor(message: string) {
        super(message);
        this.name = NAME;
    }
}