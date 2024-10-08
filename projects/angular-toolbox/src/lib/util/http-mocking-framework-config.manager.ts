/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Destroyable, HttpMockProductionPolicy } from "../model";
import { HttpMockingFrameworkConfig } from "../model/business/mock/http/config/http-mocking-framework-config";
import { HttpMockServiceError } from "../core";
import { HTTPMethodRef } from "../framework/mock/http/util/http-method-ref.enum";

/**
 * @private
 */
const POLICY_WARNING: string = "HTTP Mocking Framework is running in production mode";

/**
 * @private
 */
const POLICY_ERROR: HttpMockServiceError = new HttpMockServiceError(POLICY_WARNING + ": remove all framework references or change the 'productionPolicy' property value of the HTTP_MOCKING_FRAMEWORK_CONFIG provider.");

/**
 * @private
 */
const FLAG_ID: string = "http-mocking-framework-flag";

/**
 * The object that manages the HTTP Mocking Framework options.
 */
export class HttpMockingFrameworkConfigManager implements Destroyable {

    /**
     * @private
     */
    private _document!: Document;
    
    /**
     * @private
     */
    private _config?: HttpMockingFrameworkConfig;
    
    /**
     * @private
     */
    private readonly _isProdMode: boolean;

    /**
     * @private
     */
    private readonly _prodPolicy: HttpMockProductionPolicy;

    /**
     * Returns the value specified by the `disableVisualFlag` of the `HttpMockingFrameworkConfig` provider,
     * or `false` when no provider is defined.
     */
    public get disableVisualFlag(): boolean {
        const cfg: HttpMockingFrameworkConfig | undefined = this._config;
        return cfg && cfg.disableVisualFlag ? cfg.disableVisualFlag : false;
    }

    /**
     * Returns the value specified by the `productionPolicy` of the `HttpMockingFrameworkConfig` provider,
     * or `HttpMockProductionPolicy.ERROR` when no provider is defined.
     */
    public get productionPolicy(): HttpMockProductionPolicy {
        return this._prodPolicy;
    }

    /**
     * @private
     * Creates and Initializes the manager with the specified config.
     * 
     * @param document The reference to the `Document` object, injected by Angular.
     * @param isDevMode Indicates wheter Angular runs in development mode (`true`), or in production mode (`false`).
     * @param config The `HttpMockingFrameworkConfi` provider.
     */
    constructor(document: Document, isDevMode: boolean, config?: HttpMockingFrameworkConfig) {
        this._isProdMode = !isDevMode;
        this._document = document;
        this._config = config;
        this._prodPolicy = config && config.productionPolicy !== undefined ? config.productionPolicy : HttpMockProductionPolicy.ERROR;
        this.checkPolicy();
        this.createVisualFlag(document, config);
    }
    
    /**
     * Apply a strategy depending on the current production policy and environment.
     * @param route An optional parameter used when the methhod is associated to a HTTP request.
     *              Must be the representation of the intercepted route path.
     * @param method An optional parameter used when the methhod is associated to a HTTP request.
     *               Must be the representation of the intercepted HTTP method.
     */
    public checkPolicy(route?: string, method: HTTPMethodRef | undefined = undefined): void {
        if (!this._isProdMode) return;
        if (this._prodPolicy === HttpMockProductionPolicy.ERROR) throw POLICY_ERROR;
        if (this._prodPolicy === HttpMockProductionPolicy.SILENT) return;
        const routeMsg: string = route ? `: intercepted request=[path=${route}, method=${method?.toUpperCase()}]` : ".";
        console.warn(POLICY_WARNING + routeMsg);
    }

    /**
     * @private
     */
    public destroy(): void {
        const cfg: HttpMockingFrameworkConfig | undefined = this._config;
        const noFlag: boolean = (cfg && cfg.disableVisualFlag) === true;
        this._config = null as any;
        if (noFlag)  return;
        const doc: Document = this._document;
        const flag: HTMLElement | null = doc.getElementById(FLAG_ID);
        if (flag) {
            flag.onmouseover = flag.onmouseout =null;
            doc.body.removeChild(flag);
        }
    }

    /**
     * @private
     */
    private createVisualFlag(document: Document, config?: HttpMockingFrameworkConfig): void {
        if (config && config.disableVisualFlag) return;
        const flag: HTMLDivElement = document.createElement("div");
        const text: Text = document.createTextNode("HTTP Mocking Framwork");
        const style: CSSStyleDeclaration = flag.style;
        const body = document.body;
        flag.setAttribute("id", FLAG_ID);
        style.backgroundColor = "red";
        style.color = "white";
        style.textAlign = "center";
        style.position = "fixed";
        style.width = "100%";
        style.overflow = "hidden";
        style.height = "26px";
        style.transition = "all 0.25s ease-in-out";
        style.zIndex = "10000";
        style.opacity = "1";
        style.userSelect = "none";
        flag.onmouseover = ()=> {
            style.height = "26px";
            style.opacity = "1";
        };
        flag.onmouseout = ()=> {
            style.height = "6px";
            style.opacity = "0.35";
        };
        flag.appendChild(text);
        body.insertBefore(flag, body.firstChild);
        setTimeout(()=> {
            style.height = "4px";
            style.opacity = "0.35";
        }, 4000);
    }
};