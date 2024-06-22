/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpHeaders, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { XhrProxy, HttpResponseMock, HttpMethodMock } from "../../../../model";
import { ProgressEventMock } from "../event/progress-event-mock";
import { EMPTY_STRING } from "../../../../util";
import { XhrBase } from "./xhr-base";
import { HttpHeadersUtil } from "../util/http-headers.util";
import { RouteMockConfig } from "../config/route-mock-config";

/**
 * @private
 * Utility interface used by the `DelegateXhr` class to store HTTP request information.
 */
interface DataStorage {
    
    /**
     * @private
     */
    httpResponse: HttpResponseMock;

    /**
     * @private
     * The amount of data currently loaded.
     */
    loaded: number;

    /**
     * @private
     * The totla size  of data to load.
     */
    total: number;
}

/**
 * @private
 * A utility class used as delegate of `XMLHttpRequest` functionalities when
 * a HTTP request is intercepted by the Mocking Framework .
 */
export class DelegateXhr extends XhrBase implements XhrProxy {
    
    /**
     * @private
     * Indicates whether the progressive download is activated, or not.
     */
    private _progressiveDownload: boolean = false;

    /**
     * @private
     * The config for the intercepted route.
     */
    private _routeConfig: RouteMockConfig;

    /**
     * @private
     * 
     * Internal storage for HTTP response `data`.
     */
    private _dataStorage: DataStorage = null as any; 

    /**
     * @private
     * 
     * Internal storage for the HTTP request `method`.
     */
    private _method: unknown; 

    /**
     * @private
     * 
     * Internal storage for the HTTP request URL.
     */
    private _url: unknown; 

    /**
     * @private
     * 
     * Internal storage for the HTTP request `readyState`.
     */
    private _readyState: number = this.UNSENT;

    /**
     * @private
     * 
     * Internal storage for the HTTP request `headers`.
     */
    private _headers: HttpHeaders = null as any;

    /**
     * @private
     * 
     * Internal storage for the HTTP request `status`.
     */
    private _status: number = 0;

    /**
     * @private
     * 
     * Internal storage for the HTTP request `statusText`.
     */
    private _statusText: string = EMPTY_STRING;

    /**
     * @private
     * 
     * Internal storage for the HTTP request `responseText`.
     */
    private _responseText: string = EMPTY_STRING;

    /**
     * Returns the response body content.
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/response
     */
    get response(): any {
        return this._dataStorage.httpResponse.body;
    }

    /**
     * Returns the numerical HTTP status code of the `XMLHttpRequest` response.
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/status
     */
    get status(): number {
        return this._status;
    }

    /**
     * Returns a string containing the response status message as returned by the HTTP server.
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/statusText
     */
    get statusText(): string {
        return this._statusText;
    }

    /**
     * Returns the state the `XMLHttpRequest` client is in.
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/readyState
     */
    get readyState(): number {
        return this._readyState;
    }

    /**
     * Returns the serialized URL of the response or the empty string if the URL is `null`. 
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/responseURL
     */
    get responseURL(): string {
        return this._url as string;
    }

    /**
     * Returns the text received from a server following a request being sent.
     *
     * Throws an `InvalidStateError` DOMException if responseType is not the empty string or "text".
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/responseText
     */
    get responseText(): string {
        return this._responseText;
    }

    /**
     *  Returns an `XMLHttpRequestUpload` object that can be observed to monitor an upload progress. 
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
     */
    get upload(): XMLHttpRequestUpload {
        return null as any;
    }
    
    /**
     *  Returns an an enumerated string value specifying the type of data contained in the response. 
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
     */
    responseType: XMLHttpRequestResponseType = "";

    /**
     * Initializes a newly-created request, or re-initializes an existing one.
     * 
     * @param method The HTTP request method to use, such as `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`,
     *               etc. Ignored for non-HTTP(S) URLs.
     * @param url A string or any other object with a stringifier — including a URL object —
     *            that provides the URL of the resource to send the request to.
     */
    open(method: string, url: string | URL): void;
    /**
     * @private
     */
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    /**
     * @private
     */
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        this._method = method;
        this._url = url;
        this.seetReadyState(this.OPENED);
    }

    /**
     * Aborts the request if it has already been sent. When a request is aborted, its `readyState`
     * is changed to `XMLHttpRequest.UNSENT` and the request status code is set to `0`.
     */
    abort(): void {
        this._readyState = this.UNSENT;
        this._status = 0;
        this.eventDispatch("abort");
    }

    /**
     * Returns all the response headers, separated by CRLF, as a string, or returns `null`
     * if no response has been received.
     * 
     * @returns All the response headers, separated by CRLF, as a string, or returns `null`
     *          if no response has been received.
     */
    getAllResponseHeaders(): string {
        return HttpHeadersUtil.stringify(this._dataStorage.httpResponse.headers);
    }

    /**
     * Sends the request to the server.
     * 
     * @param body A body of data to be sent in the XHR request.
     */
    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        this.buildDataStorage(body)
        this.seetReadyState(this.HEADERS_RECEIVED);
        this.seetReadyState(this.LOADING);

        const response: HttpResponseMock = this._dataStorage.httpResponse;
        const headers: HttpHeaders | undefined = response.headers;
        this._responseText = JSON.stringify(response.body);
        this._headers = headers || new HttpHeaders();

        if (!this._progressiveDownload) {
            this._statusText = response.statusText || EMPTY_STRING;
            this._status = response.status || 0;
            return this.onLoadComplete();
        }
        this.doProgressiveDownload();
    }

    /**
     * Sets the value of an HTTP request header.
     * 
     * @param name The name of the header whose value is to be set.
     * @param value The value to set as the body of the header.
     */
    setRequestHeader(name: string, value: string): void {
        this._headers.append(name, value);
    }

    /**
     * @private 
     */
    constructor(routeConfig: RouteMockConfig) {
        super();
        const methodConfig: HttpMethodMock = routeConfig.methodConfig;
        this._routeConfig = routeConfig;
        this._progressiveDownload = methodConfig.progressive || false;
        this.responseType = methodConfig.responseType || "";
        this._headers = HttpHeadersUtil.createDefaultRequestHeaders();
    }
    
    /**
     * Internally used by the framework to delete a `DelegateXhr` instance.
     */
    public destroy(): void {
        this._routeConfig = null as any;
        this._headers = null as any;
        this._dataStorage = null as any;
    }

    /**
     * @private 
     */
    private doProgressiveDownload(): void {
        const total: number = this._dataStorage.total;
        if (total <= 200) {
            console.warn("[Angular Toolbox]: Body content is too small for emulating progressive download! Minimum size is 200 octets.");
            return this.onLoadComplete();
        }
        // TODO ameliorate the following process:
        const self: DelegateXhr = this;
        const chunckSize: number = Math.floor(total / 10);
        let cursor: number = 0;
        this._statusText = "Partial Content";
        this._status = HttpStatusCode.PartialContent;
        const idx = setInterval(()=> {
            cursor += chunckSize;
            if (cursor > total) {
                cursor = total;
                clearInterval(idx);
                self.onLoadComplete();
            } else {
                this._dataStorage.loaded = cursor;
                self.dispatchProgressEvent();
            }
        }, 100);
    }

    /**
     * @private
     * Dispatches an new event with the specified type.
     */
    private onLoadComplete(): void {
        this._dataStorage.loaded = this._dataStorage.total;
        this.seetReadyState(this.DONE);
        this.eventDispatch("load");
    }

    /**
     * @private
     * Dispatches an new event with the specified type.
     */
    private eventDispatch(type: string): void {
        const event: Event = new Event(type);
        Object.defineProperty(event, 'target', {writable: false, value: this});
        Object.defineProperty(event, 'currentTarget', {writable: false, value: this});
        this.dispatchEvent(event);
    }

    /**
     * @private 
     */
    private dispatchProgressEvent(): void {
        const d: any = this._dataStorage;
        const event: ProgressEventMock = new ProgressEventMock("progress");
        event.loaded = d.loaded;
        event.total = d.total;
        this.dispatchEvent(event);
    }

    /**
     * @private 
     */
    private seetReadyState(state: number): void {
        this._readyState = state;
    }

    /**
     * @private 
     */
    private buildDataStorage(requestBody?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        const request: HttpRequest<any> = new HttpRequest<any>(this._method as string, this._url as any, requestBody);
        const rc: RouteMockConfig = this._routeConfig;
        const data: HttpResponseMock = (rc.methodConfig as any).data(request, rc.parameters);
        const body: any = data.body;
        this._dataStorage = {
            httpResponse: data,
            loaded: 0,
            total: body ? new Blob([JSON.stringify(body)]).size : 0
        };
    }
}