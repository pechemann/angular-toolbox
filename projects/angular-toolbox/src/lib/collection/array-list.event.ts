/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ArrayList } from "./array-list";
import { ArrayListEventType } from "./array-list-event-type.enum";

/**
 * The `ArrayListEvent` class represents an event that is dispatched when the associated collection changes.
 */
export class ArrayListEvent<T> {

    /**
     * The type of this event.
     */
    public readonly type: ArrayListEventType;
    
    /**
     * The reference to the `ArrayList` instance that dispatches this event.
     */
    public readonly list: ArrayList<T>;
    
    /**
     * Represents events dispatched by the `ArrayList` class.
     * 
     * @param type The type of the event.
     * @param list The reference to the `ArrayList` instance that dispatches this event.
     */
    constructor(type: ArrayListEventType, list: ArrayList<T>) {
        this.type = type;
        this.list = list;
    }
}