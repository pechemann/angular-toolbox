/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Specifies the name of the browsing context the resource is being loaded into.
 */
export enum BrowserWindowTarget {

    /**
     * The current browsing context.
     */
    SELF = "self",

    /**
     * Usually a new tab, but users can configure browsers to open a new window instead.
     */
    BLANK = "_blank",

    /**
     * The parent browsing context of the current one. If no parent, behaves as `BrowserWindowTarget.SELF`.
     */
    PARENT = "_parent",

    /**
     * The topmost browsing context.
     */
    TOP = "_top",

    /**
     * Allows embedded fenced frames to navigate the top-level frame.
     */
    UNFENCED_TOP = "_unfencedTop"
}