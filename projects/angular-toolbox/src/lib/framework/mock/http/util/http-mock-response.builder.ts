/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { HttpMockError, HttpResponseMock } from "../../../../model";

/**
 * @private
 */
const OK: string = "OK";

/**
 * A statefull builder for creating new `HttpResponseMock` instances.
 */
export class HttpResponseMockBuilder {

    /**
     * @private
     */
    private _response: HttpResponseMock = {
        url: null,
        body: null,
        status: HttpStatusCode.Ok,
        statusText: OK,
        error: null,
        delay: 0
    };

    /**
     * Sets the body property of the new `HttpResponseMock` instance with the specified `body` value.
     * 
     * @param body The value used to set the body property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public body(body: any): HttpResponseMockBuilder {
        this._response.body = body;
        return this;
    }

    /**
     * Sets the headers property of the new `HttpResponseMock` instance with the specified `headers` value.
     * 
     * @param headers The value used to set the `headers` property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public headers(headers: HttpHeaders): HttpResponseMockBuilder {
        this._response.headers = headers;
        return this;
    }

    /**
     * Sets the `status` property of the new `HttpResponseMock` instance with the specified `status` value.
     * 
     * @param status The value used to set the `status` property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public status(status: number): HttpResponseMockBuilder {
        this._response.status = status;
        return this;
    }

    /**
     * Sets the `statusText` property of the new `HttpResponseMock` instance with the specified `statusText` value.
     * 
     * @param statusText The value used to set the `statusText` property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public statusText(statusText: string): HttpResponseMockBuilder {
        this._response.statusText = statusText;
        return this;
    }

    /**
     * Sets the `url` property of the new `HttpResponseMock` instance with the specified `url` value.
     * 
     * @param url The value used to set the `url` property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public url(url: string | null): HttpResponseMockBuilder {
        this._response.url = url;
        return this;
    }

    /**
     * Sets the `delay` property of the new `HttpResponseMock` instance with the specified `timer` duration.
     * Maximum value is `10000` miliseconds (10 seconds).
     * 
     * @param timer The value used to set the `delay` property of the new `HttpResponseMock` instance.
     * 
     * @returns A reference to this `HttpResponseMockBuilder` instance.
     */
    public delay(timer: number = 0): HttpResponseMockBuilder {
        this._response.delay = timer;
        return this;
    }

    /**
     * Returns a new `HttpResponseMock` instance, built from the properties specified with the
     * `HttpResponseMockBuilder` methods.
     * 
     * @param error An optional value used to set the `error` property of the new `HttpResponseMock` instance.
     *              The `error` parameter values take precedence over all other properties of the `HttpResponseMock`
     *              instance.
     * @returns A new `HttpResponseMock` instance.
     */
    public response(error: HttpMockError | null = null): HttpResponseMock {
        this._response.error = error;
        return this._response;
    }
}

/**
 * A utility function used to create new "chainable" `HttpResponseMockBuilder` instances.
 * 
 * @returns A new `HttpResponseMockBuilder` instance.
 */
export const httpResponseMock:()=> HttpResponseMockBuilder = ()=> new HttpResponseMockBuilder();