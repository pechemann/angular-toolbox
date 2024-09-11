/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { WindowFeatureState } from "./window-feature-state";
import { WindowTarget } from "./window-target";

/**
 * Defines the APi used to initialize the windows created by the `WindowService.open()` method.
 */
export interface WindowInit {

    /**
     * The name of the browsing context the resource is being loaded into.
     */
    target?: WindowTarget;

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
     * Specifies whether the directories are activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    directories?: WindowFeatureState;
    
    /**
     * Specifies whether the title bar is activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    titlebar?: WindowFeatureState;
    
    /**
     * Specifies whether the scrollbars are activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    scrollbars?: WindowFeatureState;

    /**
     * Specifies whether the toolbar is activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    toolbar?: WindowFeatureState;

    /**
     * Specifies whether the location is activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    location?: WindowFeatureState;

    /**
     * Specifies whether the status is activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    status?: WindowFeatureState;

    /**
     * Specifies whether the menu bar is activated (`WindowFeatureState.YES`), or not (`WindowFeatureState.NO`).
     */
    menubar?: WindowFeatureState;

    /**
     * Indicates whether the winbdow is centered (`true`), or not (`false`).
     * If `true`, the `top` and `left` properties are ignored.
     */
    center?: boolean;
}