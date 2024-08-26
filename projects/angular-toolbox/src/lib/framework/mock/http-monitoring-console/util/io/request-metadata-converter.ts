/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockRequestMetadata } from "../../../../../model";
import { AtxHttpRequestMetadataDto } from "../../model/business/io/atx-http-request-metadata.dto.ts";
import { Uuid } from "../../../../../util";

/**
 * @private
 * A utility class that converts `HttpMockRequestMetadata` objects into `AtxHttpRequestMetadataDto` objects.
 */
export class RequestMetadataConverter {

    /**
     * @private
     * Converts a `HttpMockRequestMetadata` object into an `AtxHttpRequestMetadataDto` object.
     * 
     * @param headers The `HttpMockRequestMetadata` object to convert.
     * @returns A new `AtxHttpRequestMetadataDto` object.
     */
    public static requestMetadataToDto(metadata: HttpMockRequestMetadata): AtxHttpRequestMetadataDto {
        return {
            duration: metadata.duration,
            id: metadata.id.toString(),
            stalled: metadata.stalled,
            start: metadata.start,
            url: metadata.url.toString()
        };
    }
    
    /**
     * @private
     * Converts an `AtxHttpRequestMetadataDto` object into a `HttpMockRequestMetadata` object.
     * 
     * @param headersDto The `AtxHttpRequestMetadataDto` objects to convert.
     * @returns A new `HttpMockRequestMetadata` objects.
     */
    public static dtoToRequestMetadata(dto: AtxHttpRequestMetadataDto): HttpMockRequestMetadata {
        return {
            duration: dto.duration,
            id: Uuid.fromString(dto.id),
            stalled: dto.stalled,
            start: dto.start,
            url: new URL(dto.url)
        };
    }
}
