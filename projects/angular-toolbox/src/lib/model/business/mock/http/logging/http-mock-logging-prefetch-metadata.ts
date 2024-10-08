/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from "@angular/common/http";
import { HttpMockRequestMetadata } from "../http-mock-request-metadata";

/**
 * The markup interface for all prefetch log metadata of the HTTP Mocking Framework.
 */
export interface HttpMockLoggingPrefetchMetadata {
    request: HttpRequest<any>;
    requestMetadata: HttpMockRequestMetadata;
}