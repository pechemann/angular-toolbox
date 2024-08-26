/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders } from "@angular/common/http";
import { AtxHeaderDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-header-dto";
import { HttpHeadersConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-headers-converter";
import { HttpHeadersUtil } from "projects/angular-toolbox/src/lib/framework/mock/http/util/http-headers.util";

describe('HttpHeadersConverter', () => {

    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    const dtoList: AtxHeaderDto[] = [
        { name: "foo1", value: ["bar1"] },
        { name: "foo2", value: ["bar2"] }
    ];

    it('headersToDto() should return a list of AtxHeaderDto objects', () => {
        const result: any = HttpHeadersConverter.headersToDto(headers);
        expect(Array.isArray(result)).toBeTrue();
        result.forEach((elm: any) => {
            expect(elm.hasOwnProperty("name")).toBeTrue();
            expect(elm.hasOwnProperty("value")).toBeTrue();
        });
    });

    it('headersToDto() should create a list of AtxHeaderDto objects with the specified parameters', () => { 
        const result: AtxHeaderDto[] = HttpHeadersConverter.headersToDto(headers);
        result.forEach((elm: AtxHeaderDto)  => {
            const value = (elm as any).value[0];
            expect(headers.get(elm.name)).toEqual(value);
        })
    });
    
    it('dtoToHeaders() should return a HttpHeaders instance', () => {
        const result: any = HttpHeadersConverter.dtoToHeaders(dtoList);
        expect(result).toBeInstanceOf(HttpHeaders);
    });

    it('dtoToHeaders() should create a map of HTTP headers with the specified parameters', () => {
        const result: any = HttpHeadersConverter.dtoToHeaders(dtoList);
        dtoList.forEach((elm: AtxHeaderDto) => {
            const value = (elm as any).value[0];
            expect(result.get(elm.name)).toEqual(value);
        });
    });
});
