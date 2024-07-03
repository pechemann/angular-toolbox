/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockService } from "../../../../model/service/mock/http/http-mock.service";
import { XhrProxy } from "../../../../model";
import { DelegateXhr } from "./delegate-xhr";
import { EMPTY_STRING } from "../../../../util";
import { XhrBase } from "./xhr-base";
import { RouteMockConfig } from "../config/route-mock-config";

/**
 * @private
 * An error used as reference for unit testing.
 * Angular framework calls `XMLHttpRequest` method only after the `open()` method invokation.
 */
const XHR_ERROR: (method: string)=>void = (method: string)=> {
    throw new Error(`Attempt to call ${method}() method before calling open().`)
};

/**
 * @private
 * A XHR proxy that is used by the Mocking Framework to apply HTTP call strategies.
 */
export class XhrProxyImpl extends XhrBase implements XhrProxy {

    /**
     * @private
     * Stores an internal XMLHttpRequestobject used as delegate,
     * depending on the testing strategy defined by the config file.
     */
    private XHR!: XhrProxy;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get response(): any {
        return this.XHR ? this.XHR.response : undefined;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get status(): number {
        return this.XHR ? this.XHR.status : 0;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get statusText(): string {
        return this.XHR ? this.XHR.statusText : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get readyState(): number {
        return this.XHR ? this.XHR.readyState : this.UNSENT;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get responseURL(): string {
        return this.XHR ? this.XHR.responseURL : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get responseText(): string {
        return this.XHR ? this.XHR.responseText : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    get responseType(): XMLHttpRequestResponseType {
        return this.XHR ? this.XHR.responseType : EMPTY_STRING as XMLHttpRequestResponseType;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    set responseType(value: XMLHttpRequestResponseType)  {
        if(!this.XHR) XHR_ERROR("responseType");
        this.XHR.responseType = value;
    }

    get upload(): XMLHttpRequestUpload {
        return this.XHR.upload;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    open(method: string, url: string | URL): void;
    open(method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
    open(method: unknown, url: unknown, async?: unknown, username?: unknown, password?: unknown): void {
        const m: string = (method as string).toString().toLowerCase();
        const parsedUrl: URL = URL.canParse(url as string) ? new URL(url as string) : new URL(this._httpMockService.getAppOrigin() + url);
        const config: RouteMockConfig | undefined = this._httpMockService.getRouteConfig(parsedUrl, m);
        if (this.XHR && this.XHR instanceof DelegateXhr) this.XHR.destroy();
        this.XHR = config ? new DelegateXhr(config) : new XMLHttpRequest();
        this.XHR.withCredentials = this.withCredentials;
        this.XHR.open(m.toString(), parsedUrl.toString());
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    abort(): void {
        if (this.XHR) this.XHR.abort();
        XHR_ERROR("abort");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    getAllResponseHeaders(): string {
        return this.XHR ? this.XHR.getAllResponseHeaders() : EMPTY_STRING;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    override addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        if (this.XHR) return this.XHR.addEventListener(type as any, listener as any, options as any);
        XHR_ERROR("addEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    override removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
        if (this.XHR) return this.XHR.removeEventListener(type as any, listener as any, options as any);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    send(body?: Document | XMLHttpRequestBodyInit | null | undefined): void {
        if (this.XHR) return this.XHR.send(body);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    setRequestHeader(name: string, value: string): void {
        if (this.XHR) return this.XHR.setRequestHeader(name, value);
        XHR_ERROR("removeEventListener");
    }

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }
}
