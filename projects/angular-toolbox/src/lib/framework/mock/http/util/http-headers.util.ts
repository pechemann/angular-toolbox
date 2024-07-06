/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders } from "@angular/common/http";
import { EMPTY_STRING } from "../../../../util";
import { httpHeadersMock } from "./http-headers-mock.builder";

/**
 * @private
 * Internal reference to a new line character.
 */
const NL: string = "\n";

/**
 * @private
 * A set of static utilities for manipulating `HttpHeaders` objects.
 */
export class HttpHeadersUtil {

    /**
     * @private
     * Returns a string representation the the specified `HttpHeaders `object, compatible with the format
     * expected by the `XMLHttpRequest.getAllResponseHeaders()` method.
     * 
     * @param headers The `HttpHeaders` object to format.
     * 
     * @returns A string compatible with the format expected by the `XMLHttpRequest.getAllResponseHeaders()` method.
     */
    public static stringify(headers: HttpHeaders | undefined): string {
        let result: string = EMPTY_STRING;
        if (!headers) return result;
        const keys: string[] = headers.keys();
        const last: number = keys.length - 1;
        keys.forEach((key: string, index: number)=> {
            result += `${key}: ${headers.getAll(key)}${index !== last ? NL : EMPTY_STRING}`;
        });
        return result;
    }
    
    /**
     * @private
     * Creates the default `HttpHeaders` object for a mocked HTTP request.
     * 
     * @returns The default `HttpHeaders` object for a mocked HTTP request.
     */
    public static createDefaultRequestHeaders(): HttpHeaders {
        // "Accept" header is set by Angular framework when missing
        return httpHeadersMock().cacheControl()
                                .acceptEncoding()
                                .acceptLanguage()
                                .priority()
                                .userAgent()
                                .headers();
    }
}
