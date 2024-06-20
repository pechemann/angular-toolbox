import { XhrFactory } from "@angular/common";
import { inject } from "@angular/core";
import { HttpMockService } from "../../../model/service/mock/http/http-mock.service";
import { HttpMethodMock, XMLHttpRequestProxy } from "../../../model";
import { DelegateXhr } from "./delegate-xhr";
import { EMPTY_STRING } from "../../../util";
import { XhrBase } from "./xhr-base";

/**
 * @private
 */
class XMLHttpRequestProxyImpl extends XhrBase implements XMLHttpRequestProxy {

    private XHR!: XMLHttpRequestProxy;

    get response(): any {
        return  this.XHR ? this.XHR.response : null;
    }

    get status(): number {
        return this.XHR ? this.XHR.status : 0;
    }

    get statusText(): string {
        return this.XHR ? this.XHR.statusText : EMPTY_STRING;
    }

    override get responseXML(): Document | null {
        return this.XHR ? this.XHR.responseXML : null;
    }

    get readyState(): number {
        return this.XHR ? this.XHR.readyState : this.UNSENT;
    }

    get responseURL(): string {
        return this.XHR ? this.XHR.responseURL : EMPTY_STRING;
    }

    get responseText(): string {
        return this.XHR ? this.XHR.responseText : EMPTY_STRING;
    }

    get upload(): XMLHttpRequestUpload {
        return this.XHR.upload;
    }

    open(method: string, url: string | URL): void;
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        console.log("open")
        const m: string = (method as string).toString().toLowerCase();
        const u: string = (url as string);
        const config: HttpMethodMock | undefined = this._httpMockService.getMethodConfig(u, m);
        if (this.XHR && this.XHR instanceof DelegateXhr) this.XHR.destroy();
        this.XHR = config ? new DelegateXhr(config) : new XMLHttpRequest();
        this.XHR.withCredentials = this.withCredentials;
        this.XHR.responseType = this.responseType;
        /*this.XHR.onabort = this.onabort;
        this.XHR.onerror = this.onerror;
        this.XHR.onload = this.onload;
        this.XHR.onloadend = this.onloadend;
        this.XHR.onloadstart = this.onloadstart;
        this.XHR.onprogress = this.onprogress;
        this.XHR.onreadystatechange = this.onreadystatechange;*/
        this.XHR.open(m.toString(), u, async as any, username as any, password as any);
    }

    abort(): void {
        console.log("abort")
        this.XHR.abort();
    }

    getResponseHeader(name: string): string | null {
        console.log("getResponseHeader", name)
        return this.XHR.getResponseHeader(name);
    }

    override dispatchEvent(event: Event): boolean {
        console.log("dispatchEvent", event)
        return this.XHR.dispatchEvent(event);
    }

    getAllResponseHeaders(): string {
        console.log("getAllResponseHeaders", this.XHR.getAllResponseHeaders())
        return this.XHR.getAllResponseHeaders();
    }

    override addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        console.log("addEventListener", type)
        this.XHR.addEventListener(type as any, listener as any, options as any);
    }

    overrideMimeType(mime: string): void {
        console.log("overrideMimeType", mime)
        this.XHR.overrideMimeType(mime);
    }

    override removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
        console.log("removeEventListener", type)
        this.XHR.removeEventListener(type as any, listener as any, options as any);
    }

    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        console.log("send", body)
        this.XHR.send(body);
    }

    setRequestHeader(name: string, value: string): void {
        console.log("setRequestHeader", name, value)
        this.XHR.setRequestHeader(name, value);
    }

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }
}

/**
 * @private
 */
class XhrProxyFactoryImpl extends XhrFactory {

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

/**
 * A factory function that creates and returns a new XhrFactory instance.
 * 
 * @returns a new XhrFactory instance.
 */
export const xhrProxyFactory = ()=> {
    return new XhrProxyFactoryImpl(inject(HttpMockService));
}
