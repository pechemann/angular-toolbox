/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockRequestMetadata } from "../../../../../../model";
import { AtxHttpRequestMetadataDto } from "../../business/io/atx-http-request-metadata.dto.ts";
import { Uuid } from "../../../../../../util";

export class RequestMetadataConverter {

    public static requestMetadataToDto(metadata: HttpMockRequestMetadata): AtxHttpRequestMetadataDto {
        return {
            duration: metadata.duration,
            id: metadata.id.toString(),
            stalled: metadata.stalled,
            start: metadata.start,
            url: metadata.url.toString()
        };
    }
    
    public static dtoToRequestMetadata(metadata: AtxHttpRequestMetadataDto): HttpMockRequestMetadata {
        return {
            duration: metadata.duration,
            id: Uuid.fromString(metadata.id),
            stalled: metadata.stalled,
            start: metadata.start,
            url: new URL(metadata.url)
        };
    }
}
