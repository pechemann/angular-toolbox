/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 *
 * This source code is derived from the following original source code:
 * - https://github.com/benlesh/event-target-polyfill
 * - Copyright (c) 2020 Ben Lesh
 * 
 * Use of the original source code is governed by an MIT-style license 
 * that can be found in the LICENSE file at
 * https://github.com/benlesh/event-target-polyfill/blob/master/LICENSE
 */

import { FUNCTION } from "../../../../util";

/**
 * @private
 */
const ADD: string = "addEventListener";

/**
 * @private
 */
const REMOVE: string = "removeEventListener";

/**
 * @private
 * A utility class the provides an implementation for the `EventTarget` interface.
 * This class is used internally by the framework; please do not expose it.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
export class EventTargetImpl implements EventTarget {

    /**
     * @private
     */
    private _listenerList: Map<string, any>;

    /**
     * @private
     */
    constructor() {
        this._listenerList = new Map<string, any>();
    }

    /**
     * @private
     * Sets up a function that will be called whenever the specified event is delivered to the target.
     * 
     * @param type a case-sensitive string representing the event type to listen for.
     * @param listener the object that receives a notification (an object that implements the
     *                 `Event` interface) when an event of the specified type occurs. 
     * @param options an object that specifies characteristics about the event listener.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     */
    public addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        this.checkArgLength(arguments.length, ADD);
        const ll: Map<string, any> = this._listenerList;
        if (!ll.has(type)) ll.set(type, new Map());
        const listenersForType: Map<any, any> = ll.get(type);
        if (!listenersForType.has(listener)) {
            // Any given listener is only registered once
            listenersForType.set(listener, options);
        }
    }

    /**
     * @private
     * Removes an event listener previously registered with `EventTarget.addEventListener()` from the target. 
     * 
     * @param type a case-sensitive which specifies the type of event for which to remove an event listener.
     * @param listener the event listener function of the event handler to remove from the event target.
     * @param options An options object that specifies characteristics about the event listener.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
     */
    public removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        this.checkArgLength(arguments.length, REMOVE);
        const ll: Map<string, any> = this._listenerList;
        if (ll.has(type)) {
            const listenersForType: Map<any, any> = ll.get(type);
            if (listenersForType.has(listener)) listenersForType.delete(listener);
            if (listenersForType.size === 0) ll.delete(type);
        }
    }

    /**
     * @private
     * Sends an `Event` to this to the `Event` object, (synchronously) invoking the affected event listeners
     * in the appropriate order.
     *
     * @param event the `Event object to dispatch. Its Event.target property will be set to the current EventTarget.
     * @returns true since there are no cancellable events on a base `EventTarget`.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
     */
    public dispatchEvent(event: Event): boolean {
        if (!(event instanceof Event)) {
            throw new TypeError(
                "Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'."
            );
        }
        const type: string = event.type;
        const ll: Map<string, any> = this._listenerList;
        const listenersForType = ll.get(type);
        if (!listenersForType) return true;
        for (const listnerEntry of listenersForType.entries()) {
            const listener: any = listnerEntry[0];
            const options: any = listnerEntry[1];
            // Listener functions must be executed with the EventTarget as the `this` context.
            if (typeof listener === FUNCTION) listener.call(this, event);
            // Listener objects have their handleEvent method called, if they have one
            else if (listener && typeof listener.handleEvent === FUNCTION) listener.handleEvent(event);
            if (options && options.once) listenersForType.delete(listener);
            if (listenersForType.size === 0) ll.delete(type);
        }
        return true;
    }

    /**
     * Checks whether the `EventTarget` object has any listeners registered for a specific type of event.
     * 
     * @param type The type of event.
     * 
     * @return  A value of `true` if a listener of the specified type is registered; `false` otherwise.
     */
    public hasEventListener(type: string): boolean {
        return this._listenerList.has(type);
    }

    /**
     * @private
     */
    private checkArgLength(argLen: number, method: string): void {
        if (argLen < 2) {
            throw new TypeError(
                `TypeError: Failed to execute '${method}' on 'EventTarget': 2 arguments required, but ${argLen === 1 ? 'only 1' : '0'} present.`
            );
        }
    }
}