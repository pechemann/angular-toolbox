/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ArrayList } from "./array-list";

/**
 * The `ArrayList` class uses a backing `Array` as the source of the data collection. Items in the backing
 * `Array` can be accessed and manipulated using the methods and properties of the `ArrayList` instance.
 * Operations on an `ArrayList` instance modify the data source.
 * 
 * You typically use the `ArrayList` class as base class for services that persist data in the User Interface.
 */
export class ArrayListEvent<T> {

    /**
     * The type of event associated with the `ArrayList.addAll` action. 
     */
    public static ADD_ALL: string = "addAll";

    /**
     * The type of event associated with the `ArrayList.addItem`, or `ArrayList.addItemAt` actions. 
     */
    public static ADD: string = "add";

    /**
     * The type of event associated with the `ArrayList.removeAll` action. 
     */
    public static REMOVE_ALL: string = "removeAll";

    /**
     * The type of event associated with the `ArrayList.remove`, or `ArrayList.removeAt` actions. 
     */
    public static REMOVE: string = "remove";

    /**
     * The type of this event.
     */
    public readonly type: any;
    
    /**
     * The reference to the `ArrayLis` instance that dispateches this event.
     */
    public readonly list: ArrayList<T>;
    
    /**
     * Represents events dispatched by the `ArrayLis` class.
     * 
     * @param type The type of the event.
     * @param list The reference to the `ArrayLis` instance that dispateches this event.
     */
    constructor(type: any, list: ArrayList<T>) {
        this.type = type;
        this.list = list;
    }
}