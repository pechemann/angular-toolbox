/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the the metadata associated to an HTTP mock request.
 */
export interface HttpMockRequestMetadata {

    /**
     * Indicates the starting time of the HTTP request.
     */
    start: number;

    /**
     * Indicates the duration of the HTTP request.
     */
    duration: number;
}
