/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from "@angular/common/http";
import { AtxHttpRequestDto } from "../../business/io/atx-http-request.dto";
import { HttpHeadersConverter } from "./log-headers-converter";
import { BodyConverter } from "./body-converter";

export class HttpRequestConverter {

    public static buildRequestDto(request: HttpRequest<any>): AtxHttpRequestDto {
        return {
            body: BodyConverter.bodyToDto(request.body),
            reportProgress: request.reportProgress,
            withCredentials: request.withCredentials,
            responseType: request.responseType,
            method: request.method,
            urlWithParams: request.urlWithParams,
            headers: HttpHeadersConverter.headersToDto(request.headers),
            params: request.params.toString() 
        }
    }
}
