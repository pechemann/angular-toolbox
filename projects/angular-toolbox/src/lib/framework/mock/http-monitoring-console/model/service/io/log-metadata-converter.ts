/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingMetadata } from "../../../../../../model";
import { AtxHttpLogMetadataDto } from "../../business/io/atx-http-log-metadata.dto";
import { RequestMetadataConverter } from "./request-metadata-converter";
import { HttpRequestConverter } from "./http-request-converter";
import { HttpResponseConverter } from "./http-response-converter";

export class LogMetadataConverter {

    public static metadataToDto(metadata: HttpMockLoggingMetadata): AtxHttpLogMetadataDto {
        return {
            request: HttpRequestConverter.buildRequestDto(metadata.request),
            response: HttpResponseConverter.buildResponseDto(metadata.response),
            requestMetadata: RequestMetadataConverter.requestMetadataToDto(metadata.requestMetadata)
        };
    }

    public static dtoToMetadata(metadata: AtxHttpLogMetadataDto): HttpMockLoggingMetadata {
        return {
            request: null as any,
            response: null as any,
            requestMetadata: RequestMetadataConverter.dtoToRequestMetadata(metadata.requestMetadata)
        };
    }
}
