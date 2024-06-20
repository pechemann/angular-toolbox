import { EventTargetImpl } from "angular-toolbox";

/**
 * @private
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
     * XMLHTTPRequest API
     */
    get responseXML(): Document | null {
        return null;
    }

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onabort: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onerror: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onload: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onloadend: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onloadstart: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onprogress: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null = null;

    /**
     * @private
     * 
     * XMLHTTPRequest API
     */
    ontimeout: ((this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any) | null = null;

}