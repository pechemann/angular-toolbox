/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The `ArrayListEventType` class the type of events on an `ArrayListEvent` object.
 */
export enum ArrayListEventType {

    /**
     * The type of event associated with the `ArrayList.addAll` action. 
     */
    ADD_ALL = "addAll",

    /**
     * The type of event associated with the `ArrayList.addItem`, or `ArrayList.addItemAt` actions. 
     */
    ADD = "add",

    /**
     * The type of event associated with the `ArrayList.removeAll` action. 
     */
    REMOVE_ALL = "removeAll",

    /**
     * The type of event associated with the `ArrayList.remove`, or `ArrayList.removeAt` actions. 
     */
    REMOVE = "remove"
}