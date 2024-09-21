/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DropdownComponent } from "../../../../component";
import { DropdownEventType } from "./dropdown-event-type.enum";
import { DropdownState } from "./dropdown-state";

/**
 * The `DropdownEvent` class is an event that represents an interaction with a dropdown container.
 */
export class DropdownEvent {

    /**
     * The reference to the container that triggered this event.
     */
    public readonly target: DropdownComponent;

    /**
     * The type of this event; a `DropdownEventType` constant.
     */
    public readonly type: DropdownEventType;

    /**
     * The state the dropdown container is transitioning to.
     */
    public readonly newState: DropdownState;

    /**
     * The state the dropdown container is transitioning from.
     */
    public readonly oldState: DropdownState;

    /**
     * Creates a new `DropdownEvent` instance.
     * 
     * @param target The dropdown container that triggered this event.
     * @param type The type of this event.
     * @param newState The state the dropdown container is transitioning to.
     * @param oldState The state the dropdown container is transitioning from.
     */
    constructor(target: DropdownComponent, type: DropdownEventType, newState: DropdownState, oldState: DropdownState) {
        this.target = target;
        this.type = type;
        this.newState = newState;
        this.oldState = oldState;
    }
}