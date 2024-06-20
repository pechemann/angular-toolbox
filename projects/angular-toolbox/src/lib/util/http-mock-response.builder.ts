import { HttpHeaders, HttpStatusCode } from "@angular/common/http";
import { HttpResponseMock } from "../model";

const OK: string = "OK";

/**
 * A statefull builder for creating new HttpResponseMock instances.
 */
export class HttpResponseMockBuilder {

    /**
     * @private
     */
    private _response: HttpResponseMock = {
        url: null,
        body: null,
        status: HttpStatusCode.Ok,
        statusText: OK
    };

    /**
     * Sets the body property of the new HttpResponseMock instance with sthe specified body value.
     * 
     * @param body the value used to set the body property of the new HttpResponseMock instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public body(body: any): HttpResponseMockBuilder {
        this._response.body = body;
        return this;
    }

    /**
     * Sets the headers property of the new HttpResponseMock instance with sthe specified headers value.
     * 
     * @param headers the value used to set the headers property of the new HttpResponseMock instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public headers(headers: HttpHeaders): HttpResponseMockBuilder {
        this._response.headers = headers;
        return this;
    }

    /**
     * Sets the status property of the new HttpResponseMock instance with sthe specified status value.
     * 
     * @param status the value used to set the status property of the new HttpResponseMock instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public status(status: number): HttpResponseMockBuilder {
        this._response.status = status;
        return this;
    }

    /**
     * Sets the statusText property of the new HttpResponseMock instance with sthe specified statusText value.
     * 
     * @param statusText the value used to set the statusText property of the new HttpResponseMock instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public statusText(statusText: string): HttpResponseMockBuilder {
        this._response.statusText = statusText;
        return this;
    }

    /**
     * Sets the url property of the new HttpResponseMock instance with sthe specified url value.
     * 
     * @param url the value used to set the url property of the new HttpResponseMock instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public url(url: string | null): HttpResponseMockBuilder {
        this._response.url = url;
        return this;
    }

    /**
     * Return a new HttpResponseMock instance, built from the properties specified with the
     * HttpResponseMockBuilder methods.
     * 
     * @returns a new HttpResponseMock instance.
     */
    public response(): HttpResponseMock {
        return this._response;
    }
}

/**
 * A utility function used to create new "chainable" HttpResponseMock instances.
 * 
 * @returns a new HttpResponseMock instance;
 */
export const httpResponseMock:()=> HttpResponseMockBuilder = ()=> new HttpResponseMockBuilder();