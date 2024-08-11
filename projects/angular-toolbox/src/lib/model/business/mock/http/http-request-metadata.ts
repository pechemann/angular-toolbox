/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the config of a HTTP response mock object.
 */
export interface HttpRequestMetadata {

    /**
     * The response body. Can be either an object, or an `Observable` instance.
     */
    startTime: number;

    endTime: number;
}
