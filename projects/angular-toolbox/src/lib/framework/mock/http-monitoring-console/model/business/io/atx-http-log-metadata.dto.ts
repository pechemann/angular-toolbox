/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpRequestDto } from "./atx-http-request.dto.js";
import { AtxHttpRequestMetadataDto } from "./atx-http-request-metadata.dto.ts.js";

export interface AtxHttpLogMetadataDto {
    
    request: AtxHttpRequestDto;

    response: any;

    /**
     * The request metada associated with the original log.
     */
    requestMetadata: AtxHttpRequestMetadataDto;
}