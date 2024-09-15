/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 */
export type LayoutRegionType = "north" | "south" | "west" | "west" | "east" | "center";

/**
 * Defines the list of layout constraints that defines the regions of a `BorderLayout` container.
 */
export enum LayoutRegion {

    /**
     * The north layout constraint (top of container).
     */
    NORTH = "north",

    /**
     * The south layout constraint (bottom of container).
     */
    SOUTH = "south",

    /**
     * The west layout constraint (left side of container).
     */
    WEST = "west",

    /**
     * The east layout constraint (right side of container).
     */
    EAST = "east",

    /**
     * The center layout constraint (middle of container).
     */
    CENTER = "center"
};
