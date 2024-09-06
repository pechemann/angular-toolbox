/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowInit } from "../../model";
import { EMPTY_STRING } from "../empty-string.const";


/**
 * A static builder that creates the features associated with a popup window created by
 * the `WindowService.open()` method.
 */
export class BrowserWindowFeaturesBuilder {

    public static build(init?: WindowInit): string {
        if (!init) return "popup=true,left=100,top=100,width=800,height=450";
        let features: string = "popup=true";
        features += BrowserWindowFeaturesBuilder.getLeft(init);
        features += BrowserWindowFeaturesBuilder.getTop(init);
        features += BrowserWindowFeaturesBuilder.getWidth(init);
        features += BrowserWindowFeaturesBuilder.getHeight(init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("directories", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("titlebar", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("scrollbars", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("toolbar", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("location", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("status", init);
        features += BrowserWindowFeaturesBuilder.getPopupProp("menubar", init);
        return features;
    }

    /**
     * @private
     */
    public static getLeft(init?: WindowInit): string {
        const v: number | undefined = init?.left;
        return ",left=" + (v || 100);
    }

    /**
     * @private
     */
    public static getTop(init?: WindowInit): string {
        const v: number | undefined = init?.top;
        return ",top=" + (v || 100);
    }

    /**
     * @private
     */
    public static getWidth(init?: WindowInit): string {
        const v: number | undefined = init?.width;
        return ",width=" + (v || 800);
    }

    /**
     * @private
     */
    public static getHeight(init?: WindowInit): string {
        const v: number | undefined = init?.height;
        return ",height=" + (v || 450);
    }

    /**
     * @private
     */
    public static getPopupProp(property: string, init?: WindowInit): string {
        if (!init) return EMPTY_STRING;
        const v: any = (init as any)[property as any];
        if (!v) return EMPTY_STRING;
        return `,${property}=${v}`;
    }
}
