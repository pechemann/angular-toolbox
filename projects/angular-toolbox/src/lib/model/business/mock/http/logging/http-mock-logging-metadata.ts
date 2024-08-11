/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { HttpMockRequestMetadata } from "../http-mock-request-metadata";

/**
 * The markup interface for all log metadata of the HTTP Mocking Framework.
 */
export interface HttpMockLoggingMetadata {
    request: HttpRequest<any>;
    response: HttpResponse<any>;
    requestMetadata: HttpMockRequestMetadata;
}