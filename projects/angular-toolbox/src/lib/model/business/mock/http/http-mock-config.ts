/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { HttpMockInterceptor } from "./http-mock-interceptor";

/**
 * An interface that let Developer define mocking strategies for Angular HTTP calls.
 */
export interface HttpMockConfig {

    /**
     * The main URL origin for this mock, as defined by the URL standard.
     * 
     * @see https://url.spec.whatwg.org/#url
     */
    origin?: string;

    /**
     * The configuration of mocking strategies for each specific API.
     */
    interceptors: HttpMockInterceptor[];
}
