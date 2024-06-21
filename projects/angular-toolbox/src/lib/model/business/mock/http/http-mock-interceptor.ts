/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { HttpMockEndpoint } from "./http-mock-endpoint";

/**
 * Provides the API for defining mocking strategies for a specific API.
 */
export interface HttpMockInterceptor {

    /**
     * The ID of this interceptor.
     */
    id: string;
    
    /**
     * The URL origin for this interceptor, as defined by the URL standard.
     * 
     * @see https://url.spec.whatwg.org/#url
     */
    origin?: string;

    /**
     * A list of endpoints that must be intercepted by the HTTP Mock Framework.
     */
    endpoints: HttpMockEndpoint[];
}
