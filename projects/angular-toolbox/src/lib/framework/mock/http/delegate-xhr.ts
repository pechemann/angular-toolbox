import { HttpHeaders, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { XMLHttpRequestProxy, HttpMethodMock } from "../../../model";
import { ProgressEventMock } from "./progress-event-mock";
import { DefaultHeadersConfigFactory } from "./util/default-headers-config.factory";
import { EMPTY_STRING } from "../../../util";
import { HttpResponseMock } from "angular-toolbox";
import { XhrBase } from "./xhr-base";

/**
 * @private
 */
declare interface DataStorage {
    httpResponse: HttpResponseMock;
    loaded: number;
    total: number;
}

/**
 * @private
 */
export class DelegateXhr extends XhrBase implements XMLHttpRequestProxy {
    
    /**
     * @private
     */
    private _methodConfig: HttpMethodMock;

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
        return this._responseText;
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
        if (this.onabort) this.onabort.call(this, this.getProgressEvent("abort"));
    }

    getResponseHeader(name: string): string | null {
        const header: HttpHeaders | undefined = this._dataStorage.httpResponse.headers;
        return header ? header.get(name) : null;
    }

    getAllResponseHeaders(): string {
        const headers: HttpHeaders | undefined = this._dataStorage.httpResponse.headers;
        let result: string = EMPTY_STRING;
        if (headers) {
            headers.keys().forEach((key: string)=> result += `${key}: ${headers.getAll(key)}`)
        }
        return result;
    }

    overrideMimeType(mime: string): void {
        console.log("d-overrideMimeType", mime)
    }

    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        this.buildDataStorage(body)
        this.seetReadyState(this.HEADERS_RECEIVED);

        
        this.seetReadyState(this.LOADING);
        if (this.onloadstart) this.onloadstart.call(this, this.getProgressEvent("loadstart"));

        const response: HttpResponseMock = this._dataStorage.httpResponse;
        this._status = response.status || HttpStatusCode.InternalServerError;
        this._statusText = response.statusText || "Internal Server Error";
        this._responseText = JSON.stringify(response.body);

        this._dataStorage.loaded = this._dataStorage.total;
        
        this.seetReadyState(this.DONE);

        if (this.onload) this.onload.call(this, this.getProgressEvent("load"));
        this.eventDispatch("load");

        if (this.onloadend) this.onloadend.call(this, this.getProgressEvent("loadend"));
    }

    setRequestHeader(name: string, value: string): void {
        this._headers.append(name, value);
    }

    constructor(methodConfig: HttpMethodMock) {
        super();
        this._methodConfig = methodConfig;
        this._headers = DefaultHeadersConfigFactory.create();
    }
    
    public destroy(): void {
        this._methodConfig = null as any;
        this._headers = null as any;
    }

    /**
     * @private
     * Dispatches an new event with the specified type.
     */
    private eventDispatch(type: string): void {
        const event: Event = new Event(type);
        Object.defineProperty(event, 'target', {writable: false, value: this});
        Object.defineProperty(event, 'currentTarget', {writable: false, value: this});
        console.log(event)
        this.dispatchEvent(event);
    }

    private getProgressEvent(type: string): ProgressEvent {
        const d: any = this._dataStorage;
        const event: ProgressEventMock = new ProgressEventMock(type);
        event.loaded = d.loaded;
        event.total = d.total;
        return event;
    }

    private seetReadyState(state: number): void {
        this._readyState = state;
        if (!this.onreadystatechange) return;
        this.onreadystatechange.call(this, new Event("readystatechange"));
    }

    private buildDataStorage(requestBody?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        const request: HttpRequest<any> = new HttpRequest<any>(this._method as string, this._url as any, requestBody);
        const data: HttpResponseMock = (this._methodConfig as any).data(request);
        const body: any = data.body;
        this._dataStorage = {
            httpResponse: data,
            loaded: 0,
            total: body ? new Blob([JSON.stringify(body)]).size : 0
        };
    }
}