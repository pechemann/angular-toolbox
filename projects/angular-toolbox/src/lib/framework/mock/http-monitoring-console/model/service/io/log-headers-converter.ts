/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders } from "@angular/common/http";
import { AtxHeaderDto } from "../../business/io/atx-header-dto";

export class HttpHeadersConverter {

    public static headersToDto(headers: HttpHeaders): AtxHeaderDto[] {
        const dtoList: AtxHeaderDto[] = [];
        const keys: string[] = headers.keys();
        let cursor: number = keys.length - 1;
        for(; cursor >= 0; cursor--) {
            const key: string = keys[cursor];
            dtoList.push({
                name: key,
                value: headers.getAll(key)
            });
        }
        return dtoList;
    }

    public static dtoToHeaders(headersDto: AtxHeaderDto[]): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        let cursor: number = headersDto.length - 1;
        for(; cursor >= 0; cursor--) {
            const entry: AtxHeaderDto = headersDto[cursor];
            const value: string[] | null = entry.value;
            if (value) headers = headers.append(entry.name, value);
            
        }
        return headers;
    }
}
