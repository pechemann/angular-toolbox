/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventEmitter } from "@angular/core";
import { IdentifiableComponent } from "../core";
import { ArrayListEvent } from "./array-list.event";

/**
 * The `ArrayList` class uses a backing `Array` as the source of the data collection. Items in the backing
 * `Array` can be accessed and manipulated using the methods and properties of the `ArrayList` instance.
 * Operations on an `ArrayList` instance modify the data source.
 * 
 * You typically use the `ArrayList` class as base class for services that persist data in the User Interface.
 */
export class ArrayList<T> extends IdentifiableComponent {

    /**
     * Dispatches events each time this `ArrayList` is modified.
     */
    public readonly change: EventEmitter<ArrayListEvent<T>> = new EventEmitter<ArrayListEvent<T>>();

    /**
     * Get the number of items in the list.
     */
    public get length(): number {
        return this.__list__.length;
    }

    /**
     * @private
     * The array used as a source for the `ArrayList`.
     */
    protected __list__: Array<T> = [];

    /**
     * @private
     */
    constructor(classRef: string | undefined = undefined) {
        super(classRef || "ArrayList");
    }
    
    /**
     * Adds a list of items to the current `ArrayList` instance, placing them at the end of the
     * list in the order they are passed.
     * 
     * @param addList The list of items to add to this current `ArrayList` instance.
     * 
     * @return A reference to this `ArrayList` instance.
     */
    public addAll(addList: Array<T>): ArrayList<T> {
        this.__list__.push(...addList);
        this.dispatchEvent(ArrayListEvent.ADD_ALL);
        return this;
    }

    /**
     * Add the specified item to the end of the list.
     * 
     * @param item The item to add.
     * 
     * @return A reference to this `ArrayList` instance.
     */
    public addItem(item: T): ArrayList<T> {
        this.__list__.push(item);
        this.dispatchEvent(ArrayListEvent.ADD);
        return this;
    }

    /**
     * Add the item at the specified index.
     *
     * @param item The item to place at the index.
     * @param index The index at which to place the item.
     * 
     * @return A reference to this `ArrayList` instance.
     */
    public addItemAt(item: T, index: number): ArrayList<T> {
        if (index < 0) throw new RangeError ("index must be greater that 0");
        const len: number = this.__list__.length;
        if (index > len) throw new RangeError (`index exceeds the number of list elements. Index must not exceed ${len}.`);
        this.__list__.splice(index, 0, item);
        this.dispatchEvent(ArrayListEvent.ADD);
        return this;
    }

    /**
     * Get the item at the specified index.
     *
     * @param index The index in the list from which to retrieve the item.
     * 
     * @returns The item at that index, `undefined` if there is none.
     */
    public getItemAt(index: number): T {
        return this.__list__[index];
    }

    /**
     * Return the index of the item if it is in the list.
     * 
     * @param item The item to find.
     * 
     * @returns The index of the item, `-1` if the item is not in the list.
     */
    public getItemIndex(item: T): number {
        return this.__list__.findIndex(elm => elm === item);
    }

    /**
     * Remove all items from the list.
     * 
     * @return A reference to this `ArrayList` instance.
     */
    public removeAll(): ArrayList<T> {
        this.__list__.length = 0;
        this.dispatchEvent(ArrayListEvent.REMOVE_ALL);
        return this;
    }

    /**
     * Removes the specified item from this list.
     * 
     * @param item Reference to the item that should be removed.
     *
     * @returns  `true` whether if the item was removed; `false` otherwise.
     */
    public removeItem(item: T): boolean {
        const idx: number = this.getItemIndex(item);
        if (idx === -1) return false;
        this.__list__.splice(idx, 1);
        this.dispatchEvent(ArrayListEvent.REMOVE);
        return true;
    }

    /**
     * Remove the item at the specified index and return it.
     * Any items that were after this index are now one index earlier.
     * 
     * @param index The index from which to remove the item.

     * @returns The item that was removed.
     */
    public removeItemAt(index: number): T {
        const result: T = this.__list__.splice(index, 1)[0];
        this.dispatchEvent(ArrayListEvent.REMOVE);
        return result;
    }

    /**
     * Return an array that is populated in the same order as this `ArrayList` instance.
     * 
     * @returns An array that is populated in the same order as this `ArrayList` instance.
     */
    public toArray(): Array<T> {
        return this.__list__.slice(0);
    }

    /**
     * @private
     */
    private dispatchEvent(type: string): void {
        const event: ArrayListEvent<T> = new ArrayListEvent<T>(type, this);
        this.change.emit(event);
    }
}