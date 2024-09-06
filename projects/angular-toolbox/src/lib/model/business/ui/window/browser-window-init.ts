/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BrowserWindowTFeatureState } from "./browser-window-feature-state";
import { BrowserWindowTarget } from "./browser-window-target";

/**
 * Defines the APi used to initialize the windows created by the `BrowserWindowService.open()` method.
 */
export interface BrowserWindowInit {

    /**
     * The name of the browsing context the resource is being loaded into.
     */
    target?: BrowserWindowTarget;

    /**
     * The title of the new window.
     */
    title?: string;

    /**
     * The icon of the new window.
     */
    icon?: string;

    /**
     * Specifies the distance in pixels from the left side of the work area as defined by the user's operating system where the new window will be generated.
     */
    left?: number;

    /**
     * Specifies the distance in pixels from the top side of the work area as defined by the user's operating system where the new window will be generated.
     */
    top?: number;

    /**
     * Specifies the width of the content area, including scrollbars. The minimum required value is `100`.
     */
    width?: number;

    /**
     * Specifies the height of the content area, including scrollbars. The minimum required value is `100`.
     */
    height?: number;
    
    /**
     * Specifies whether the directories are activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    directories?: BrowserWindowTFeatureState;
    
    /**
     * Specifies whether the title bar is activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    titlebar?: BrowserWindowTFeatureState;
    
    /**
     * Specifies whether the scrollbars are activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    scrollbars?: BrowserWindowTFeatureState;

    /**
     * Specifies whether the toolbar is activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    toolbar?: BrowserWindowTFeatureState;

    /**
     * Specifies whether the location is activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    location?: BrowserWindowTFeatureState;

    /**
     * Specifies whether the status is activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    status?: BrowserWindowTFeatureState;

    /**
     * Specifies whether the menu bar is activated (BrowserWindowTFeatureState.YES`), or not (BrowserWindowTFeatureState.NO`).
     */
    menubar?: BrowserWindowTFeatureState;
}