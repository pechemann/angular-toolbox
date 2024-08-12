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
const NAME: string = "HttpMockServiceError";

/**
 * Represents errors thrown by `HttpMockService` instances.
 */
export class HttpMockServiceError extends Error {

    /**
     * Creates en new `HttpMockService` instances.
     * 
     * @param message A human-readable description of the error.
     */
    constructor(message: string) {
        super(message);
        this.name = NAME;
    }
}