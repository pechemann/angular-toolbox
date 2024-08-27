/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { ATX_IS_IMPORTED_LOG } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-is-imported-log";
import { AtxHttpRequestDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-http-request.dto";
import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { BodyConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/body-converter";
import { HttpRequestConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/http-request-converter";
import { HttpHeadersConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-headers-converter";
import { DATA, STRING_DATA, URL_STRING } from "../../test-util/http-monitoring-test-util";

describe('HttpRequestConverter', () => {
    
    const buildRequest = (method: any = "GET", body: any = null, init: any = null)=> {
        const request: HttpRequest<any> = new HttpRequest<any>(method, URL_STRING, body, init);
        return request;
    };

    const buildDto = ()=> {
        const dto: AtxHttpRequestDto = {
            body: {
                data: STRING_DATA,
                type: ConsoleBodyType.JSON
            },
            reportProgress: true,
            withCredentials: true,
            responseType: "blob",
            method: "POST",
            headers: [],
            url: URL_STRING,
            params: "foo=bar"
        }
        return dto;
    };

    it('buildRequestDto() should return an AtxHttpRequestDto object', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.hasOwnProperty("body")).toBeTrue();
        expect(result.hasOwnProperty("reportProgress")).toBeTrue();
        expect(result.hasOwnProperty("withCredentials")).toBeTrue();
        expect(result.hasOwnProperty("responseType")).toBeTrue();
        expect(result.hasOwnProperty("method")).toBeTrue();
        expect(result.hasOwnProperty("url")).toBeTrue();
        expect(result.hasOwnProperty("params")).toBeTrue();
        expect(result.hasOwnProperty("headers")).toBeTrue();
    });
    
    it('AtxHttpRequestDto.body should be null by default', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.body).toEqual({ type: ConsoleBodyType.NULL, data: null });
    });

    it('buildRequestDto() should invoke the BodyConverter.bodyToDto() method', () => {
        const request = buildRequest("POST", DATA);
        spyOn(BodyConverter, "bodyToDto");
        HttpRequestConverter.buildRequestDto(request);
       expect(BodyConverter.bodyToDto).toHaveBeenCalledOnceWith(DATA);
    });
    
    it('AtxHttpRequestDto.reportProgress should be false by default', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.reportProgress).toBeFalse();
    });
    
    it('AtxHttpRequestDto.reportProgress should be set with the specified value', () => {
        const request = buildRequest("GET", null, { reportProgress: true });
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.reportProgress).toBeTrue();
    });
    
    it('AtxHttpRequestDto.withCredentials should be false by default', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.withCredentials).toBeFalse();
    });
    
    it('AtxHttpRequestDto.withCredentials should be set with the specified value', () => {
        const request = buildRequest("GET", null, { withCredentials: true });
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.withCredentials).toBeTrue();
    });
    
    it('AtxHttpRequestDto.responseType should be "json" by default', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.responseType).toEqual("json");
    });
    
    it('AtxHttpRequestDto.responseType should be set with the specified value', () => {
        const request = buildRequest("GET", null, { responseType: "blob" });
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.responseType).toEqual("blob");
    });

    it('AtxHttpRequestDto.method shoud be set with the specified HTTP method', () => {
        const request = buildRequest( "TRACE");
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.method).toEqual("TRACE");
    });

    it('AtxHttpRequestDto.url should be set with the specified HTTP url', () => {
        const request = buildRequest();
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.url).toEqual(URL_STRING);
    });

    it('AtxHttpRequestDto.params should be set with the specified HTTP params, converted to string', () => {
        const params: HttpParams = new HttpParams();
        params.append("foo", "bar");
        const request = buildRequest("GET", null, { params: params });
        const result: any = HttpRequestConverter.buildRequestDto(request);
        expect(result.params).toEqual(params.toString());
    });

    it('buildRequestDto() should invoke the HttpHeadersConverter.headersToDto() method', () => {
        const headers: HttpHeaders = new HttpHeaders();
        spyOn(HttpHeadersConverter, "headersToDto");
        const request = buildRequest("GET", null, { headers: headers });
        HttpRequestConverter.buildRequestDto(request);
       expect(HttpHeadersConverter.headersToDto).toHaveBeenCalledOnceWith(headers);
    });

    it('buildHttpRequest() should return an HttpRequest object', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result).toBeInstanceOf(HttpRequest);
    });
    
    it('HttpRequestConverter.body should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.body).toEqual(DATA);
    });
    
    it('HttpRequestConverter.reportProgress should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.reportProgress).toEqual(dto.reportProgress);
    });
    
    it('HttpRequestConverter.responseType should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.responseType).toEqual(dto.responseType);
    });
    
    it('HttpRequestConverter.withCredentials should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.withCredentials).toEqual(dto.withCredentials);
    });
    
    it('HttpRequestConverter.method should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.method).toEqual(dto.method);
    });
    
    it('HttpRequestConverter.url should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.url).toEqual(dto.url);
    });
    
    it('HttpRequestConverter.params should be set with the specified data', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        const params: any = result.params;
        expect(params.get("foo")).toEqual("bar");
    });

    it('buildHttpRequest() should invoke the BodyConverter.dtoToBody() method', () => {
        spyOn(BodyConverter, "dtoToBody");
        const dto = buildDto();
        HttpRequestConverter.buildHttpRequest(dto);
        expect(BodyConverter.dtoToBody).toHaveBeenCalledOnceWith(dto.body);
    });

    it('buildHttpRequest() should invoke the HttpHeadersConverter.dtoToHeaders() method', () => {
        spyOn(HttpHeadersConverter, "dtoToHeaders");
        const dto = buildDto();
        HttpRequestConverter.buildHttpRequest(dto);
        expect(HttpHeadersConverter.dtoToHeaders).toHaveBeenCalledOnceWith(dto.headers);
    });

    it('buildHttpRequest() should create a context with ATX_IS_IMPORTED_LOG set to true', () => {
        const dto = buildDto();
        const result: any = HttpRequestConverter.buildHttpRequest(dto);
        expect(result.context.get(ATX_IS_IMPORTED_LOG)).toBeTrue();
    });
});
