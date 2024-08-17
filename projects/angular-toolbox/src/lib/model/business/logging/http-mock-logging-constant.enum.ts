/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * A utility enum that stores constants used by the `HttpMockLoggingService` to create log messages.
 */
export enum HttpMockLoggingConstant {
    
    /**
     * @private
     * The "caller" reference for all logs of the HTTP Mocking Framework.
     */
    CALLER = "HTTP Mocking Framework",
    
    /**
     * @private
     * The "message" reference for all valid logs of the HTTP Mocking Framework.
     */
    RESPONSE_MESSAGE = "HTTP response",

    /**
     * @private
     * The "message" reference for all error logs of the HTTP Mocking Framework.
     */
    ERROR_MESSAGE = "HTTP error",

    /**
     * @private
     * The "message" reference for all prefetch logs of the HTTP Mocking Framework.
     */
    CONFIG_MESSAGE = "HTTP prefetch"
}
