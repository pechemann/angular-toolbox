/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpMockError } from "./http-mock-error";

/**
 * Defines the config of a HTTP response mock object.
 */
export interface HttpResponseMock {

    /**
     * The response body. Can be either an object, or an `Observable` instance.
     */
    body?: any | Observable<any>;

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

    /**
     * The optional error for this HTTP request.
     */
    error: HttpMockError | null;

    /**
     * Returns a delayed response, in miliseconds.
     * Maximum value is `10000` miliseconds (10 seconds).
     */
    delay?: number;
}
