/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpContext, HttpParams, HttpParamsOptions, HttpRequest } from "@angular/common/http";
import { AtxHttpRequestDto } from "../../model/business/io/atx-http-request.dto";
import { HttpHeadersConverter } from "./log-headers-converter";
import { BodyConverter } from "./body-converter";
import { ATX_IS_IMPORTED_LOG } from "../../model/business/atx-is-imported-log";

export class HttpRequestConverter {

    public static buildRequestDto(request: HttpRequest<any>): AtxHttpRequestDto {
        return {
            body: BodyConverter.bodyToDto(request.body),
            reportProgress: request.reportProgress,
            withCredentials: request.withCredentials,
            responseType: request.responseType,
            method: request.method,
            url: request.url,
            params: request.params.toString(),
            headers: HttpHeadersConverter.headersToDto(request.headers)
        }
    }
    
    public static buildHttpRequest(dto: AtxHttpRequestDto): HttpRequest<any> {
        const ctx: HttpContext = new HttpContext();
        const paramsOpt: HttpParamsOptions = {
            fromString: dto.params
        };
        const init: any = {
            headers: HttpHeadersConverter.dtoToHeaders(dto.headers),
            reportProgress: dto.reportProgress,
            responseType: dto.responseType,
            withCredentials: dto.withCredentials,
            params: new HttpParams(paramsOpt),
            context: ctx
        };
        const body: any = BodyConverter.dtoToBody(dto.body);
        const request: HttpRequest<any> = new HttpRequest<any>(dto.method, dto.url, body, init);
        ctx.set(ATX_IS_IMPORTED_LOG, true);
        return request;
    }
}
