/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpResponse } from "@angular/common/http";
import { HttpHeadersConverter } from "./log-headers-converter";
import { AtxHttpResponseDto } from "../../model/business/io/atx-http-response.dto";
import { BodyConverter } from "./body-converter";

export class HttpResponseConverter {

    public static buildResponseDto(response: HttpResponse<any>): AtxHttpResponseDto {
        return {
            body: BodyConverter.bodyToDto(response.body),
            headers: HttpHeadersConverter.headersToDto(response.headers),
            status: response.status,
            statusText: response.statusText,
            url: response.url
        }
    }

    public static buildHttpResponse(dto: AtxHttpResponseDto): HttpResponse<any> {
        const init: any = {
            body: BodyConverter.dtoToBody(dto.body),
            headers: HttpHeadersConverter.dtoToHeaders(dto.headers),
            status: dto.status,
            statusText: dto.statusText,
            url: dto.url
        };
        return new HttpResponse(init);
    }
}
