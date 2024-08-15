/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpResponse } from "@angular/common/http";
import { HttpMockLoggingPrefetchMetadata } from "./http-mock-logging-prefetch-metadata";

/**
 * The markup interface for all log metadata of the HTTP Mocking Framework.
 */
export interface HttpMockLoggingMetadata extends HttpMockLoggingPrefetchMetadata {
    response: HttpResponse<any>;
}