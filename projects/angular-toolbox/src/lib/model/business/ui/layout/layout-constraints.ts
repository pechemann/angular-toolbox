/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LayoutRegion, LayoutRegionType } from "./layout-region";

export interface LayoutConstraints {
    region: LayoutRegion | LayoutRegionType;
    resizable?: boolean;
    size?: number;
    minSize?: number;
    maxSize?: number;
}