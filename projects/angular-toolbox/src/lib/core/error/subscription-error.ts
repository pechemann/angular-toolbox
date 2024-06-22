/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * Represents errors thrown by `SubscriptionService` instances.
 */
export class SubscriptionError extends Error {

    /**
     * Creates en new `SubscriptionService` instances.
     * 
     * @param message A human-readable description of the error.
     */
    constructor(message: string) {
        super(message);
        this.name = "SubscriptionError";
    }
}