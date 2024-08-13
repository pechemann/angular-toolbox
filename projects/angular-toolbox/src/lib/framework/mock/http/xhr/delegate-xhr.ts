/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders, HttpParams, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { XhrProxy, HttpResponseMock, HttpMethodMock, HttpMockError, HttpMockLoggingService, HttpMockRequestMetadata, HttpMockLoggingMetadata, FetchClient } from "../../../../model";
import { ProgressEventMock } from "../event/progress-event-mock";
import { EMPTY_STRING } from "../../../../util";
import { XhrBase } from "./xhr-base";
import { HttpHeadersUtil } from "../util/http-headers.util";
import { RouteMockConfig } from "../config/route-mock-config";
import { Observable, Subscription, of } from "rxjs";
import { DataStorage } from "../core/data-storage";
import { DataStorageBuilder } from "../util/data-storage.builder";
import { HttpMockLoggingMetadataBuilder } from "../logging/http-mock-logging-metadata.builder";

/**
 * @private
 * The maximum value for a delayed HTTP response.
 */
const MAX_TIMER: number = 10000;

/**
 * @private
 * Intenal "onreadystatechange" event.
 */
const READY_STATE_CHANGE_EVENT: Event = new Event("onreadystatechange");

/**
 * @private
 */
const EVT_PROPS_CONFIG: any =  { writable: false, value: this };

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
    private _requestHeaders: HttpHeaders = null as any;

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
     */
    private _loadSubscription: Subscription | null = null;

    /**
     * Returns the response body content.
     *
     * @see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/response
     */
    get response(): any {
        return this._dataStorage?.data || null;
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
        return this._dataStorage?.stringifiedData || EMPTY_STRING;
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
    responseType: XMLHttpRequestResponseType = EMPTY_STRING as any;

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
        this.setReadyState(this.OPENED);
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
    getAllResponseHeaders(): any {
        if (this._readyState < this.HEADERS_RECEIVED) return null;
        const respHeaders: HttpHeaders | undefined = this._dataStorage?.httpResponse.headers;
        if (respHeaders) return HttpHeadersUtil.stringify(respHeaders);
        return null;
    }

    /**
     * Sends the request to the server.
     * 
     * @param body A body of data to be sent in the XHR request.
     */
    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        const requestMetadata: HttpMockRequestMetadata = { start: Date.now(), duration: NaN };
        const request: HttpRequest<any> = this.buildHttpRequest(body);
        const rc: RouteMockConfig = this._routeConfig;
        const httpResponseMock: HttpResponseMock = (rc.methodConfig as any).data(request, rc.parameters);
        let timer: number = httpResponseMock.delay || 0;
        if (timer > MAX_TIMER) timer = MAX_TIMER;
        this._loadSubscription = this.loadData(httpResponseMock).subscribe({
            next: (data: any) => {
                this.setDataStorage(httpResponseMock, requestMetadata, data);
                const error: HttpMockError | null = this._dataStorage.httpResponse.error;
                setTimeout(()=> {
                    this.setReadyState(this.HEADERS_RECEIVED);
                    if (error) return this.onError(request, error);
                    this.setReadyState(this.LOADING);
                    const response: HttpResponseMock = this._dataStorage.httpResponse;
                    if (!this._progressiveDownload) {
                        this._statusText = response.statusText || EMPTY_STRING;
                        this._status = response.status || 0;
                        return this.onLoadComplete(request);
                    }
                    this.doProgressiveDownload(request);
                }, timer);
            },
            error: (err: any) => {
                this.setDataStorage(httpResponseMock, requestMetadata);
                this.onError(request, err);
            }
        });
    }

    /**
     * Sets the value of an HTTP request header.
     * 
     * @param name The name of the header whose value is to be set.
     * @param value The value to set as the body of the header.
     */
    setRequestHeader(name: string, value: string): void {
        this._requestHeaders = this._requestHeaders.set(name, value);
    }

    /**
     * @private 
     */
    constructor(routeConfig: RouteMockConfig,
                private _logger: HttpMockLoggingService) {
        super();
        const methodConfig: HttpMethodMock = routeConfig.methodConfig;
        this._routeConfig = routeConfig;
        this._progressiveDownload = methodConfig.progressive || false;
        this.responseType = methodConfig.responseType || EMPTY_STRING as any;
        this._requestHeaders = new HttpHeaders();
    }
    
    /**
     * @private 
     * Internally used by the framework to delete a `DelegateXhr` instance.
     */
    public destroy(): void {
        this._routeConfig = null as any;
        this._requestHeaders = null as any;
        this._dataStorage = null as any;
        if (this._loadSubscription) {
            this._loadSubscription.unsubscribe();
            this._loadSubscription = null;
        }
    }

    /**
     * @private 
     */
    private doProgressiveDownload(request: HttpRequest<any>): void {
        const total: number = this._dataStorage.total;
        if (total <= 200) {
            console.warn("[Angular Toolbox]: Body content is too small for emulating progressive download! Minimum size is 200 octets.");
            return this.onLoadComplete(request);
        }
        // TODO: ameliorate the following process:
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
                self.onLoadComplete(request);
            } else {
                this._dataStorage.loaded = cursor;
                self.dispatchProgressEvent();
            }
        }, 100);
    }

    private finalizeRequestMetadata(): HttpMockRequestMetadata {
        const ds: DataStorage = this._dataStorage;
        const metadata: HttpMockRequestMetadata = ds.requestMetadata;
        metadata.duration = Date.now() - metadata.start;
        return metadata;
    }

    /**
     * @private
     */
    private onLoadComplete(request: HttpRequest<any>): void {
        this._dataStorage.loaded = this._dataStorage.total;
        this.setReadyState(this.DONE);
        this.dispatchProgressEvent("load");
        this._logger.info(this.buildMetadata(request));
    }

    /**
     * @private
     */
    private onError(request: HttpRequest<any>, error: HttpMockError): void {
        this._status = error.status;
        this._statusText = error.statusText;
        this.setReadyState(this.DONE);
        this.dispatchProgressEvent("error");
        this._logger.error(this.buildMetadata(request));
    }

    /**
     * @private
     */
    private buildMetadata(request: HttpRequest<any>): HttpMockLoggingMetadata {
        return HttpMockLoggingMetadataBuilder.build(this, request, this.finalizeRequestMetadata());
    }

    /**
     * @private
     */
    private eventDispatch(type: string): void {
        const event: Event = new Event(type);
        Object.defineProperty(event, 'target', EVT_PROPS_CONFIG);
        Object.defineProperty(event, 'currentTarget', EVT_PROPS_CONFIG);
        this.dispatchEvent(event);
    }

    /**
     * @private 
     */
    private dispatchProgressEvent(type: string = "progress"): void {
        const d: any = this._dataStorage;
        const event: ProgressEventMock = new ProgressEventMock(type);
        event.loaded = d.loaded;
        event.total = d.total;
        this.dispatchEvent(event);
    }

    /**
     * @private 
     */
    private setReadyState(state: number): void {
        this._readyState = state;
        const event: any = this.onreadystatechange;
        if (event) event.call(this, READY_STATE_CHANGE_EVENT);
    }

    /**
     * @private 
     */
    private loadData(httpResponseMock: HttpResponseMock): Observable<any> {
        const responseBody: any | Observable<any> = httpResponseMock.body;
        return (responseBody instanceof Observable) ? responseBody : of(responseBody);
    }

    /**
     * @private 
     */
    private setDataStorage(responseMock: HttpResponseMock, requestMetadata: HttpMockRequestMetadata, data: any = null): void {
        this._dataStorage = DataStorageBuilder.buildDataStorage(responseMock, data, requestMetadata);
    }
    
    /**
     * @private 
     */
    private buildHttpRequest(body: any): HttpRequest<any> {
        let params: HttpParams = new HttpParams();
        const it: IterableIterator<[string, string]> = (this._routeConfig.searchParams as any).entries();
        for (const pair of it) params = params.set(pair[0], pair[1]);
        const init: any = {
            params: params,
            headers: this._requestHeaders,
            withCredentials: this.withCredentials,
            responseType: this.responseType,
            reportProgress: this.hasEventListener("progress")
            // context, transferCache: not used by Angular at this level of API
        };
        return new HttpRequest<any>(this._method as string, this._url as any, body, init);
    }
}