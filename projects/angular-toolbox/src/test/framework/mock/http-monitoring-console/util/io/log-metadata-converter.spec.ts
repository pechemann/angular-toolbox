/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { AtxHttpLogMetadataDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-http-log-metadata.dto";
import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { HttpRequestConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/http-request-converter";
import { HttpResponseConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/http-response-converter";
import { LogMetadataConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-metadata-converter";
import { RequestMetadataConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/request-metadata-converter";
import { HttpMockLoggingMetadata, Uuid } from "projects/angular-toolbox/src/public-api";
import { URL_OBJ, URL_STRING } from "../../test-util/http-monitoring-test-util";

describe('LogMetadataConverter', () => {

    const requestMetadata: any = {
        duration: 0,
        stalled: 0,
        start: 0,
        url: URL_OBJ,
        id: Uuid.build()
    };
    const metadata: HttpMockLoggingMetadata = {
        request: new HttpRequest("GET", URL_STRING),
        response: new HttpResponse(),
        requestMetadata: requestMetadata
    };
    const dto: AtxHttpLogMetadataDto = {
        request: {
            body: {
                data: null,
                type: ConsoleBodyType.NULL
            },
            reportProgress: true,
            withCredentials: true,
            responseType: "json",
            method: "GET",
            headers: [],
            url: URL_STRING,
            params: "foo=bar"
        },
        response:{
            body: {
                data: null,
                type: ConsoleBodyType.NULL
            },
            headers: [],
            status: HttpStatusCode.Ok,
            statusText: "Ok",
            url: URL_STRING
        },
        requestMetadata: requestMetadata
    }

    it('metadataToDto() should return an AtxHttpLogMetadataDto object', () => {
        const result: any = LogMetadataConverter.metadataToDto(metadata);
        expect(result.hasOwnProperty("request")).toBeTrue();
        expect(result.hasOwnProperty("response")).toBeTrue();
        expect(result.hasOwnProperty("requestMetadata")).toBeTrue();
    });

    it('metadataToDto() should invoke the HttpRequestConverter.buildRequestDto() method', () => {
        spyOn(HttpRequestConverter, "buildRequestDto");
        const result: any = LogMetadataConverter.metadataToDto(metadata);
        expect(HttpRequestConverter.buildRequestDto).toHaveBeenCalledOnceWith(metadata.request);
    });

    it('metadataToDto() should invoke the HttpResponseConverter.buildResponseDto() method', () => {
        spyOn(HttpResponseConverter, "buildResponseDto");
        const result: any = LogMetadataConverter.metadataToDto(metadata);
        expect(HttpResponseConverter.buildResponseDto).toHaveBeenCalledOnceWith(metadata.response);
    });

    it('metadataToDto() should invoke the RequestMetadataConverter.requestMetadataToDto() method', () => {
        spyOn(RequestMetadataConverter, "requestMetadataToDto");
        const result: any = LogMetadataConverter.metadataToDto(metadata);
        expect(RequestMetadataConverter.requestMetadataToDto).toHaveBeenCalledOnceWith(metadata.requestMetadata);
    });

    it('dtoToMetadata() should return a HttpMockLoggingMetadata object', () => {
        const result: any = LogMetadataConverter.dtoToMetadata(dto);
        expect(result.hasOwnProperty("request")).toBeTrue();
        expect(result.hasOwnProperty("response")).toBeTrue();
        expect(result.hasOwnProperty("requestMetadata")).toBeTrue();
    });

    it('dtoToMetadata() should invoke the HttpRequestConverter.buildHttpRequest() method', () => {
        spyOn(HttpRequestConverter, "buildHttpRequest");
        const result: any = LogMetadataConverter.dtoToMetadata(dto);
        expect(HttpRequestConverter.buildHttpRequest).toHaveBeenCalledOnceWith(dto.request);
    });

    it('dtoToMetadata() should invoke the HttpResponseConverter.buildHttpResponse() method', () => {
        spyOn(HttpResponseConverter, "buildHttpResponse");
        const result: any = LogMetadataConverter.dtoToMetadata(dto);
        expect(HttpResponseConverter.buildHttpResponse).toHaveBeenCalledOnceWith(dto.response);
    });

    it('dtoToMetadata() should invoke the RequestMetadataConverter.dtoToRequestMetadata() method', () => {
        spyOn(RequestMetadataConverter, "dtoToRequestMetadata");
        const result: any = LogMetadataConverter.dtoToMetadata(dto);
        expect(RequestMetadataConverter.dtoToRequestMetadata).toHaveBeenCalledOnceWith(dto.requestMetadata);
    });
});
