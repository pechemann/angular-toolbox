/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * Defines the the metadata associated to an HTTP mock request.
 */
export interface AtxHttpRequestMetadataDto {

    /**
     * @private
     * The unique ID associated with the HTTP request.
     */
    id: string;

    /**
     * @private
     * Indicates the starting time of the HTTP request.
     */
    start: number;

    /**
     * @private
     * Indicates the how much time the request is stalled befaore the data loading starts.
     */
    stalled: number;
    
    /**
     * @private
     * Indicates the duration of the HTTP request.
     */
    duration: number;

    /**
     * @private
     * The reference to the `URL` object for the HTTP request.
     */
    url: string;
}
