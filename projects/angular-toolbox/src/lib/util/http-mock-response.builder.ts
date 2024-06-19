import { HttpHeaders } from "@angular/common/http";
import { HttpResponseMockConfig } from "../model";

/**
 * A statefull builder for creating new HttpResponseMockConfig instances.
 */
export class HttpResponseMockBuilder {

    /**
     * @private
     */
    private _response: HttpResponseMockConfig = { url: null };

    /**
     * Sets the body property of the new HttpResponseMockConfig instance with sthe specified body value.
     * 
     * @param body the value used to set the body property of the new HttpResponseMockConfig instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public body(body: any): HttpResponseMockBuilder {
        this._response.body = body;
        return this;
    }

    /**
     * Sets the headers property of the new HttpResponseMockConfig instance with sthe specified headers value.
     * 
     * @param headers the value used to set the headers property of the new HttpResponseMockConfig instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public headers(headers: HttpHeaders): HttpResponseMockBuilder {
        this._response.headers = headers;
        return this;
    }

    /**
     * Sets the status property of the new HttpResponseMockConfig instance with sthe specified status value.
     * 
     * @param status the value used to set the status property of the new HttpResponseMockConfig instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public status(status: number): HttpResponseMockBuilder {
        this._response.status = status;
        return this;
    }

    /**
     * Sets the statusText property of the new HttpResponseMockConfig instance with sthe specified statusText value.
     * 
     * @param statusText the value used to set the statusText property of the new HttpResponseMockConfig instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public statusText(statusText: string): HttpResponseMockBuilder {
        this._response.statusText = statusText;
        return this;
    }

    /**
     * Sets the url property of the new HttpResponseMockConfig instance with sthe specified url value.
     * 
     * @param url the value used to set the url property of the new HttpResponseMockConfig instance.
     * 
     * @returns a reference to this HttpResponseMockBuilder instance.
     */
    public url(url: string | null): HttpResponseMockBuilder {
        this._response.url = url;
        return this;
    }

    /**
     * Return a new HttpResponseMockConfig instance, built from the properties specified with the
     * HttpResponseMockBuilder methods.
     * 
     * @returns a new HttpResponseMockConfig instance.
     */
    public response(): HttpResponseMockConfig {
        return this._response;
    }
}

/**
 * A utility function used to create new "chainable" HttpResponseMockConfig instances.
 * 
 * @returns a new HttpResponseMockConfig instance;
 */
export const httpResponseMock:()=> HttpResponseMockBuilder = ()=> new HttpResponseMockBuilder();