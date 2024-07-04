/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockEndpoint } from "./http-mock-endpoint";

/**
 * Provides the API to define mocking strategies for a specific API.
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
     * A list of endpoints that must be intercepted by the HTTP Mocking Framework.
     */
    endpoints: HttpMockEndpoint[];
}
