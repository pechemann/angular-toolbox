/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * Utility interface used by the `DelegateXhr` class to manage the delay of an HTTP response.
 */
export interface ResponseDelay {

    /**
     * @private
     * The amount of time the HTTP resquest is stalled before sending the response, in milliseconds.
     */
    stalled: number;

    /**
     * @private
     * The complete duration of an HTTP request, in milliseconds.
     */
    duration: number;
}
