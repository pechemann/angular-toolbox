/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpRequestDto } from "./atx-http-request.dto.js";
import { AtxHttpRequestMetadataDto } from "./atx-http-request-metadata.dto.ts.js";
import { AtxHttpResponseDto } from "./atx-http-response.dto.js";

/**
 * @private
 * The interface that must be implementd by ATX HTTP logging metadata DTOs.
 */
export interface AtxHttpLogMetadataDto {
    
    /**
     * @private
     * The DTO associated with the HTTP request.
     */
    request: AtxHttpRequestDto;

    /**
     * @private
     * The DTO associated with the HTTP response.
     */
    response: AtxHttpResponseDto;

    /**
     * @private
     * The HTTP request metada associated with the original log.
     */
    requestMetadata: AtxHttpRequestMetadataDto;
}