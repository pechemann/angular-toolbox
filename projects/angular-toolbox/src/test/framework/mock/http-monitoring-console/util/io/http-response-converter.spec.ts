/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { HttpHeaders, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { AtxHttpResponseDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-http-response.dto";
import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { BodyConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/body-converter";
import { HttpResponseConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/http-response-converter";
import { HttpHeadersConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-headers-converter";

describe('HttpResponseConverter', () => {
    
    const data: any = { foo: "bar" };
    const url: string = "http://fake-url.com";
    const stringData: string = '{ "foo": "bar" }';
    const buildResponse = ()=> {
        const init: any = {
            body: data,
            headers: new HttpHeaders(),
            status: HttpStatusCode.AlreadyReported,
            statusText: "Already Reported",
            url: url
        };
        const response: HttpResponse<any> = new HttpResponse<any>(init);
        return response;
    };

    const buildDto = ()=> {
        const dto: AtxHttpResponseDto = {
            body: {
                data: stringData,
                type: ConsoleBodyType.JSON
            },
            status: HttpStatusCode.Ok,
            statusText: "Ok",
            url: url,
            headers: []
        };
        return dto;
    };

    it('buildResponseDto() should return an AtxHttpResponseDto object', () => {
        const response = buildResponse();
        const dto: any = HttpResponseConverter.buildResponseDto(response);
        expect(dto.hasOwnProperty("headers")).toBeTrue();
        expect(dto.hasOwnProperty("status")).toBeTrue();
        expect(dto.hasOwnProperty("statusText")).toBeTrue();
        expect(dto.hasOwnProperty("url")).toBeTrue();
        expect(dto.hasOwnProperty("body")).toBeTrue();
    });
    
    it('buildResponseDto() should invoke the BodyConverter.bodyToDto() method', () => {
        const response = buildResponse();
        spyOn(BodyConverter, "bodyToDto");
        HttpResponseConverter.buildResponseDto(response);
        expect(BodyConverter.bodyToDto).toHaveBeenCalledOnceWith(response.body);
    });
    
    it('buildResponseDto() should invoke the HttpHeadersConverter.headersToDto() method', () => {
        const response = buildResponse();
        spyOn(HttpHeadersConverter, "headersToDto");
        HttpResponseConverter.buildResponseDto(response);
        expect(HttpHeadersConverter.headersToDto).toHaveBeenCalledOnceWith(response.headers);
    });

    it('AtxHttpResponseDto.status should be set with the specified value', () => {
        const response = buildResponse();
        const dto: any = HttpResponseConverter.buildResponseDto(response);
        expect(dto.status).toEqual(response.status);
    });

    it('AtxHttpResponseDto.statusText should be set with the specified value', () => {
        const response = buildResponse();
        const dto: any = HttpResponseConverter.buildResponseDto(response);
        expect(dto.statusText).toEqual(response.statusText);
    });

    it('AtxHttpResponseDto.url should be set with the specified value', () => {
        const response = buildResponse();
        const dto: any = HttpResponseConverter.buildResponseDto(response);
        expect(dto.url).toEqual(response.url);
    });

    it('buildHttpResponse() should return an HttpResponse object', () => {
        const dto = buildDto();
        const response: any = HttpResponseConverter.buildHttpResponse(dto);
        expect(response).toBeInstanceOf(HttpResponse);
    });

    it('buildHttpResponse() should invoke the BodyConverter.dtoToBody() method', () => {
        const dto = buildDto();
        spyOn(BodyConverter, "dtoToBody");
        HttpResponseConverter.buildHttpResponse(dto);
        expect(BodyConverter.dtoToBody).toHaveBeenCalledOnceWith(dto.body);
    });

    it('buildHttpResponse() should invoke the HttpHeadersConverter.dtoToHeaders() method', () => {
        const dto = buildDto();
        spyOn(HttpHeadersConverter, "dtoToHeaders");
        HttpResponseConverter.buildHttpResponse(dto);
        expect(HttpHeadersConverter.dtoToHeaders).toHaveBeenCalledOnceWith(dto.headers);
    });

    it('HttpResponse.status should be set with the specified value', () => {
        const dto = buildDto();
        const response: any = HttpResponseConverter.buildHttpResponse(dto);
        expect(response.status).toEqual(dto.status);
    });

    it('HttpResponse.statusText should be set with the specified value', () => {
        const dto = buildDto();
        const response: any = HttpResponseConverter.buildHttpResponse(dto);
        expect(response.statusText).toEqual(dto.statusText);
    });

    it('HttpResponse.url should be set with the specified value', () => {
        const dto = buildDto();
        const response: any = HttpResponseConverter.buildHttpResponse(dto);
        expect(response.url).toEqual(dto.url);
    });
});
