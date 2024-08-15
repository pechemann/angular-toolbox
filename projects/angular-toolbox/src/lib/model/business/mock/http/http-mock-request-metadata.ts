/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Uuid } from "../../../../util";

/**
 * Defines the the metadata associated to an HTTP mock request.
 */
export interface HttpMockRequestMetadata {

    /**
     * The unique ID associated with the HTTP request.
     */
    id: Uuid;

    /**
     * Indicates the starting time of the HTTP request.
     */
    start: number;

    /**
     * Indicates the how much time the request is stalled befaore the data loading starts.
     */
    stalled: number;
    
    /**
     * Indicates the duration of the HTTP request.
     */
    duration: number;

    /**
     * The reference to the `URL` object for the HTTP request.
     */
    url: URL;
}
