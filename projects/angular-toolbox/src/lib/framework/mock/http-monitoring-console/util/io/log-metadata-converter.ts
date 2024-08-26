/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingMetadata } from "../../../../../model";
import { AtxHttpLogMetadataDto } from "../../model/business/io/atx-http-log-metadata.dto";
import { RequestMetadataConverter } from "./request-metadata-converter";
import { HttpRequestConverter } from "./http-request-converter";
import { HttpResponseConverter } from "./http-response-converter";

/**
 * @private
 * A utility class that converts `HttpMockLoggingMetadata` objects into `AtxHttpLogMetadataDto` objects.
 */
export class LogMetadataConverter {

    /**
     * @private
     * Converts a `HttpMockLoggingMetadata` object into an `AtxHttpLogMetadataDto` object.
     * 
     * @param headers The `HttpMockLoggingMetadata` object to convert.
     * @returns A new `AtxHttpLogMetadataDto` object.
     */
    public static metadataToDto(metadata: HttpMockLoggingMetadata): AtxHttpLogMetadataDto {
        return {
            request: HttpRequestConverter.buildRequestDto(metadata.request),
            response: HttpResponseConverter.buildResponseDto(metadata.response),
            requestMetadata: RequestMetadataConverter.requestMetadataToDto(metadata.requestMetadata)
        };
    }

    /**
     * @private
     * Converts an `AtxHttpLogMetadataDto` object into a `HttpMockLoggingMetadata` object.
     * 
     * @param headersDto The `AtxHttpLogMetadataDto` objects to convert.
     * @returns A new `HttpMockLoggingMetadata` objects.
     */
    public static dtoToMetadata(dto: AtxHttpLogMetadataDto): HttpMockLoggingMetadata {
        return {
            request: HttpRequestConverter.buildHttpRequest(dto.request),
            response: HttpResponseConverter.buildHttpResponse(dto.response),
            requestMetadata: RequestMetadataConverter.dtoToRequestMetadata(dto.requestMetadata)
        };
    }
}
