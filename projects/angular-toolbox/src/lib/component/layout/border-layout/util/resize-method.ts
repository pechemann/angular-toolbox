/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * A convenient type that describes methods used to compute the size of a `BorderlayoutContainer` object,
 * depending on its region.
 */
export type ResizeMethod = (event: MouseEvent, width: number, height: number, minSize: number | undefined, maxSize: number | undefined)=> number;
