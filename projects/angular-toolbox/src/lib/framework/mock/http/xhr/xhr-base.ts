/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventTargetImpl } from "../event/event-target.impl";

/**
 * @private
 * 
 * Elemenets marked as "Useless" are never invoked by the Angular framework.
 */
export class XhrBase extends EventTargetImpl {
    
    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    readonly UNSENT = 0;
    
    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    readonly OPENED = 1;
    
    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    readonly HEADERS_RECEIVED = 2;
    
    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    readonly LOADING = 3;
    
    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    readonly DONE = 4;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    get responseXML(): Document | null {
        return null;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    withCredentials: boolean = false;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    timeout!: number;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onabort: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onerror: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onload: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onloadend: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onprogress: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    overrideMimeType(mime: string): void {}

    /**
     * @private
     * 
     * XMLHTTPRequest API - Useless
     */
    getResponseHeader(name: string): string | null { return null }
}