/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Uuid } from "../../../../util";
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
     * The unique identifier for this HTTP mock config.
     */
    id?: Uuid;

    /**
     * The configuration of mocking strategies for each specific API.
     */
    interceptors: HttpMockInterceptor[];
}
