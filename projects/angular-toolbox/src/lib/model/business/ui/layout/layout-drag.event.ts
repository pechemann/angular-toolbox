/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BorderLayoutContainer, BorderLayout } from "../../../../component";
import { LayoutDragEventType } from "../../../../model";

/**
 * The `LayoutDragEvent` class is an event that represents a drag interaction with a `BorderLayoutContainer`.
 */
export class LayoutDragEvent {

    /**
     * The reference to the container that triggered this event.
     */
    public readonly target: BorderLayoutContainer;

    /**
     * The reference to the layout that contains the target container.
     */
    public layout!: BorderLayout;

    /**
     * The type of this event; a `LayoutDragEventType` constant.
     */
    public readonly type: LayoutDragEventType;

    /**
     * Creates a new `LayoutDragEvent` instance.
     * 
     * @param target The container that triggered this event.
     * @param type The type of this event.
     */
    constructor(target: BorderLayoutContainer, type: LayoutDragEventType) {
        this.target = target;
        this.type = type;
    }
}