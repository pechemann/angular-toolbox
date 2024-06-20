import { HttpHeaders } from "@angular/common/http";
import { EMPTY_STRING } from "../../../../util";
import { httpHeadersMock } from "./http-response-headers-mock.builder";

/**
 * @private
 * Internal reference to a new line character.
 */
const NL: string = "\n";

/**
 * @private
 * A set of static utilities for manipulating HttpHeaders objects.
 */
export class HttpHeadersUtil {

    /**
     * @private
     * Returns a string representation the the specified HttpHeaders object, compatible with the format
     * waited by the XMLHttpRequest: getAllResponseHeaders() method.
     * 
     * @param headers the HttpHeaders object to format.
     * @returns a string compatible with the format waited by the XMLHttpRequest: getAllResponseHeaders() method.
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
     * 
     * Creates the default HttpHeaders object for a mock HTTP request.
     * 
     * @returns the default HttpHeaders object for a mock HTTP request.
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
