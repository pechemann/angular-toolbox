/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockingFrameworkConfig } from "../model/business/mock/http/config/http-mocking-framework-config";

/**
 * 
 */
export class HttpMockingFrameworkConfigManager {

    public init(document: Document, config: HttpMockingFrameworkConfig): void {
        this.createVisualFlag(document, config);
    }

    private createVisualFlag(document: Document, config: HttpMockingFrameworkConfig): void {
        if (config && config.disableVisualFlag) return;
        const flag: HTMLDivElement = document.createElement("div");
        const text: Text = document.createTextNode("HTTP Mocking Framwork");
        const style: CSSStyleDeclaration = flag.style;
        const body = document.body;
        flag.setAttribute("id", "http-mocking-framework-flag");
        style.backgroundColor = "red";
        style.color = "white";
        style.textAlign = "center";
        style.position = "fixed";
        style.width = "100%";
        style.overflow = "hidden";
        style.height = "26px";
        style.transition = "all 0.25s ease-in-out";
        //style.cursor = "pointer";
        flag.onmouseover = ()=> {
            style.height = "26px";
        };
        flag.onmouseout = ()=> {
            style.height = "6px";
        };
        flag.appendChild(text);
        body.insertBefore(flag, body.firstChild);
        setTimeout(()=> style.height = "4px", 4000);
    }
};