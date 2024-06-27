/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
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