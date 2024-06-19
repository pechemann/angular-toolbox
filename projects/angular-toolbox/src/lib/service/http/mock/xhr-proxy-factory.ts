import { XhrFactory } from "@angular/common";
import { inject } from "@angular/core";
import { HttpMockService } from "./http-mock.service";
import { EventTargetImpl, XMLHttpRequestProxy } from "../../../model";

/**
 * @private
 */
const GET: string = 'get';

/**
 * @private
 */
class XMLHttpRequestProxyImpl implements XMLHttpRequestProxy {

    private readonly XHR: XMLHttpRequest;
    private readonly EVT_TGT: EventTarget;
    private _routeConfig!: any;

    readonly UNSENT = 0;
    readonly OPENED = 1;
    readonly HEADERS_RECEIVED = 2;
    readonly LOADING = 3;
    readonly DONE = 4;

    get response(): any {
        return this.XHR.response;
    }

    get status(): number {
        return this.XHR.status;
    }

    get withCredentials(): boolean {
        return this.XHR.withCredentials;
    }

    get statusText(): string {
        return this.XHR.statusText;
    }

    get responseXML(): Document | null {
        return this.XHR ? this.XHR.responseXML : null;
    }

    get readyState(): number {
        return this.XHR.readyState;
    }

    get responseURL(): string {
        return this.XHR.responseURL;
    }

    get responseText(): string {
        return this.XHR.responseText;
    }

    responseType!: XMLHttpRequestResponseType;

    timeout!: number;

    get upload(): XMLHttpRequestUpload {
        return this.XHR.upload;
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
        const m: string = (method as string).toString().toLowerCase();
        const u: string = (url as string);
       // this._routeConfig = this._httpMockService.getRouteConfig(u, m);
        if (!this._routeConfig) return this.XHR.open(m.toString(), u, async as any, username as any, password as any);
    }

    abort(): void {
        console.log("abort")
        if (this._routeConfig) {
            return;
        }
        this.XHR.abort();
    }

    getResponseHeader(name: string): string | null {
        console.log("getResponseHeader", name)
        if (this._routeConfig) {
            return "";
        }
        return this.XHR.getResponseHeader(name);
    }

    dispatchEvent(event: Event): boolean {
        console.log("dispatchEvent", event)
        return !this._routeConfig ? this.XHR.dispatchEvent(event) : this.EVT_TGT.dispatchEvent(event);
    }

    getAllResponseHeaders(): string {
        console.log("getAllResponseHeaders", this.XHR.getAllResponseHeaders())
        if (this._routeConfig) {
            return "";
        }
        return this.XHR.getAllResponseHeaders();
    }

    addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        console.log("addEventListener", type)
        if (!this._routeConfig) {
            this.XHR.addEventListener(type as any, listener as any, options as any);
            return;
        }
        this.EVT_TGT.addEventListener(type as any, listener as any, options as any);
    }

    overrideMimeType(mime: string): void {
        console.log("overrideMimeType", mime)
        if (this._routeConfig) {
            return;
        }
        this.XHR.overrideMimeType(mime);
    }

    removeEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
        console.log("removeEventListener", type)
        if (!this._routeConfig) {
            this.XHR.removeEventListener(type as any, listener as any, options as any);
            return;
        }
        this.EVT_TGT.addEventListener(type as any, listener as any, options as any);
    }

    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        console.log("send", body)
        if (this._routeConfig) {
            return;
        }
        this.XHR.send(body);
    }

    setRequestHeader(name: string, value: string): void {
        console.log("setRequestHeader", name)
        if (this._routeConfig) {
            return;
        }
        this.XHR.setRequestHeader(name, value);
    }

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        this.XHR = new XMLHttpRequest();
        this.EVT_TGT = new EventTargetImpl();
    }
}

/**
 * @private
 */
class XhrProxyFactory extends XhrFactory {

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }

    /**
     * @private
     */
    public build(): XMLHttpRequest {
        return new XMLHttpRequestProxyImpl(this._httpMockService);
    }
}

export const xhrProxyFactoryFunction = ()=> {
    return new XhrProxyFactory(inject(HttpMockService));
}
