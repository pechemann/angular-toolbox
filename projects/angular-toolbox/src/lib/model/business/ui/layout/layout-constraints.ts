/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LayoutRegion, LayoutRegionType } from "./layout-region";

/**
 * Defines the layout constraints of a `BorderLayoutContainer` object.
 */
export interface LayoutConstraints {

    /**
     * Specifies the region of the `BorderLayoutContainer` object.
     */
    region: LayoutRegion | LayoutRegionType;

    /**
     * Indicates whether the `BorderLayoutContainer` object is resizable (`true`), or not (`false`).
     */
    resizable?: boolean;

    /**
     * Defines the default size of the `BorderLayoutContainer` object.
     */
    size?: number;
    
    /**
     * Defines the minimum size of the `BorderLayoutContainer` object.
     */
    minSize?: number;

    /**
     * Defines the maximum size of the `BorderLayoutContainer` object.
     */
    maxSize?: number;
}