import { HttpHeaders } from "@angular/common/http";
import { EventTargetImpl, XMLHttpRequestProxy, HttpMockConfig } from "../../../model";

/**
 * @private
 */
const GET: string = 'get';

/**
 * @private
 */
export class DelegateXMLHttpRequest extends EventTargetImpl implements XMLHttpRequestProxy {
    
    /**
     * @private
     */
    private _config: HttpMockConfig;

    /**
     * @private
     * 
     * Internal storage bor the HTTP request body.
     */
    private _body: any;

    /**
     * @private
     * 
     * Internal storage bor the HTTP request headers.
     */
    private _headers: HttpHeaders = null as any;

    readonly UNSENT = 0;
    readonly OPENED = 1;
    readonly HEADERS_RECEIVED = 2;
    readonly LOADING = 3;
    readonly DONE = 4;

    get response(): any {
        return null;
    }

    get status(): number {
        return 0;
    }

    get withCredentials(): boolean {
        return true;
    }

    get statusText(): string {
        return "";
    }

    get responseXML(): Document | null {
        return null;
    }

    get readyState(): number {
        return 0;
    }

    get responseURL(): string {
        return null as any;
    }

    get responseText(): string {
        return "";
    }

    responseType!: XMLHttpRequestResponseType;

    timeout!: number;

    get upload(): XMLHttpRequestUpload {
        return null as any;
    }

    onabort: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onerror: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onload: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onloadend: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onprogress: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null = ()=> {};

    ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = ()=> {};

    open(method: string, url: string | URL): void;
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        console.log("open")
        //const data: string
        console.log(this._config)
    }

    abort(): void {
        console.log("abort")
    }

    getResponseHeader(name: string): string | null {
        console.log("getResponseHeader", name)
        return null;
    }

    getAllResponseHeaders(): string {
        console.log("getAllResponseHeaders")
        return "";
    }

    overrideMimeType(mime: string): void {
        console.log("overrideMimeType", mime)
    }

    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        console.log("send", body)
        this._body = body;
    }

    setRequestHeader(name: string, value: string): void {
        console.log("setRequestHeader", name, value)
    }

    public destroy(): void {
        this._config = null as any;
        this._body = null;
    }

    constructor(config: HttpMockConfig) {
        super();
        this._config = config;
    }
}