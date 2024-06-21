/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { HttpHeaders } from "@angular/common/http";

/**
 * A statefull builder for creating new `HttpHeaders` instances.
 */
export class HttpHeadersMockBuilder {

    /**
     * @private
     */
    private _headers: HttpHeaders = new HttpHeaders();

    /**
     * Sets the `"Cache-Control"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Cache-Control"` property of the new `HttpHeaders` instance.
     * Default value is `"no-cache"`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public cacheControl(value: string = "no-cache"): HttpHeadersMockBuilder {
        this.setHeader("Cache-Control", value);
        return this;
    }
    
    /**
     * Sets the `"CContent-Type"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Content-Type"` property of the new `HttpHeaders` instance.
     * Default value is `"application/json; charset=utf-8"`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public contentType(value: string = "application/json; charset=utf-8"): HttpHeadersMockBuilder {
        this.setHeader("Content-Type", value);
        return this;
    }
    
    /**
     * Sets the `"Pragma"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Pragma"` property of the new `HttpHeaders` instance.
     * Default value is `"no-cache"`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public pragma(value: string = "no-cache"): HttpHeadersMockBuilder {
        this.setHeader("Pragma", value);
        return this;
    }

    /**
     * Sets the `"Priority"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Priority"` property of the new `HttpHeaders` instance.
     * Default value is `"u=0, i"`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public priority(value: string = "u=0, i"): HttpHeadersMockBuilder {
        this.setHeader("Priority", value);
        return this;
    }

    /**
     * Sets the `"User-Agent"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"User-Agent"` property of the new `HttpHeaders` instance.
     * Default value is the navigator user agent.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public userAgent(value: string | null = null): HttpHeadersMockBuilder {
        this.setHeader("User-Agent", value || navigator.userAgent);
        return this;
    }

    /**
     * Sets the `"Accept-Language"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Accept-Language"` property of the new `HttpHeaders` instance.
     * Default value is the navigator language.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public acceptLanguage(value: string | null = null): HttpHeadersMockBuilder {
        this.setHeader("Accept-Language", value || navigator.language);
        return this;
    }

    /**
     * Sets the `"Accept"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Accept"` property of the new `HttpHeaders` instance.
     * Default value is `'*\/*'`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public accept(value: string = "*/*"): HttpHeadersMockBuilder {
        this.setHeader("Accept", value);
        return this;
    }

    /**
     * Sets the `"Accept-Encoding"` property of the new `HttpHeaders` instance with the specified value.
     * 
     * @param value The value used to set the `"Accept-Encoding"` property of the new `HttpHeaders` instance.
     * Default value is `"ngzip, deflate, br, zstd"`.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public acceptEncoding(value: string = "gzip, deflate, br, zstd"): HttpHeadersMockBuilder {
        this.setHeader("Accept-Encoding", value);
        return this;
    }

    /**
     * Sets or modifies a value of the new `HttpHeaders` instance.
     *
     * @param name The header name.
     * @param value The value or values to set or override for the given header.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public set(name: string, value: string | string[]): HttpHeadersMockBuilder {
        this.setHeader(name, value);
        return this;
    }

    /**
     * Return a new `HttpHeaders` instance, built from the properties specified with the
     * `HttpHeadersMockBuilder` methods.
     * 
     * @returns A new `HttpHeaders` instance.
     */
    public headers(): HttpHeaders {
        return this._headers;
    }

    /**
     * @private
     */
    private setHeader(name: string, value: string | string[]): void {
        this._headers = this._headers.set(name, value);
    }
}

/**
 * A utility function used to create new "chainable" `HttpHeadersMockBuilder` instances.
 * 
 * @returns A new `HttpHeadersMockBuilder` instance;
 */
export const httpHeadersMock:()=> HttpHeadersMockBuilder = ()=> new HttpHeadersMockBuilder();