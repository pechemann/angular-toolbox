/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { HttpHeaders, HttpRequest } from "@angular/common/http";

/**
 * Defines the config of a HTTP response mock object.
 */
export interface HttpResponseMock {

     /**
     * The response body.
     */
    body?: any;

    /**
     * All response headers.
     */
    headers?: HttpHeaders;

    /**
     * Response status code.
     */
    status: number;

    /**
     * Textual description of response status code, defaults to `OK`.
     */
    statusText: string;

    /**
     * URL of the resource retrieved, or `null` if not available.
     */
    url: string | null;
}
