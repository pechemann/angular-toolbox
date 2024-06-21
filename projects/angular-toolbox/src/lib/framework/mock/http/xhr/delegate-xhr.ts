import { HttpHeaders, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { XhrProxy, HttpResponseMock } from "../../../../model";
import { ProgressEventMock } from "../event/progress-event-mock";
import { EMPTY_STRING } from "../../../../util";
import { XhrBase } from "./xhr-base";
import { HttpHeadersUtil } from "../util/http-headers.util";
import { RouteMockConfig } from "../config/route-mock-config";

/**
 * @private
 */
declare interface DataStorage {
    
    /**
     * @private
     */
    httpResponse: HttpResponseMock;

    /**
     * @private
     */
    loaded: number;

    /**
     * @private
     */
    total: number;
}

/**
 * @private
 */
export class DelegateXhr extends XhrBase implements XhrProxy {
    
    /**
     * @private
     */
    private _progressiveDownload: boolean = false;

    /**
     * @private
     */
    private _routeConfig: RouteMockConfig;

    /**
     * @private
     * 
     * Internal storage for HTTP response data.
     */
    private _dataStorage: DataStorage = null as any; 

    /**
     * @private
     * 
     * Internal storage for the HTTP request method.
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
     * Internal storage for the HTTP request readyState.
     */
    private _readyState: number = this.UNSENT;

    /**
     * @private
     * 
     * Internal storage for the HTTP request headers.
     */
    private _headers: HttpHeaders = null as any;

    /**
     * @private
     * 
     * Internal storage for the HTTP request status.
     */
    private _status: number = -1;

    /**
     * @private
     * 
     * Internal storage for the HTTP request statusText.
     */
    private _statusText: string = EMPTY_STRING;

    /**
     * @private
     * 
     * Internal storage for the HTTP request responseText.
     */
    private _responseText: string = EMPTY_STRING;

    get response(): any {
        return this._dataStorage.httpResponse.body;
    }

    get status(): number {
        return this._status;
    }

    get statusText(): string {
        return this._statusText;
    }

    get readyState(): number {
        return this._readyState;
    }

    get responseURL(): string {
        return this._url as string;
    }

    get responseText(): string {
        return this._responseText;
    }

    get upload(): XMLHttpRequestUpload {
        return null as any;
    }

    open(method: string, url: string | URL): void;
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        this._method = method;
        this._url = url;
        this.seetReadyState(this.OPENED);
    }

    abort(): void {
        this.eventDispatch("abort");
    }

    getAllResponseHeaders(): string {
        return HttpHeadersUtil.stringify(this._dataStorage.httpResponse.headers);
    }

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

    setRequestHeader(name: string, value: string): void {
        this._headers.append(name, value);
    }

    constructor(routeConfig: RouteMockConfig) {
        super();
        this._routeConfig = routeConfig;
        this._progressiveDownload = routeConfig.methodConfig.progressive || false;
        this._headers = HttpHeadersUtil.createDefaultRequestHeaders();
    }
    
    public destroy(): void {
        this._routeConfig = null as any;
        this._headers = null as any;
        this._dataStorage = null as any;
    }

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

    private dispatchProgressEvent(): void {
        const d: any = this._dataStorage;
        const event: ProgressEventMock = new ProgressEventMock("progress");
        event.loaded = d.loaded;
        event.total = d.total;
        this.dispatchEvent(event);
    }

    private seetReadyState(state: number): void {
        this._readyState = state;
    }

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