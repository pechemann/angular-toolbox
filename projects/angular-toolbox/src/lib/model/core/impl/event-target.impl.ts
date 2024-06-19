const FUNCTION_TYPE: string = "function";

export class EventTargetImpl implements EventTarget {

    private _listenerList: Map<string, any>;

    constructor() {
        this._listenerList = new Map<string, any>();
    }

    /**
     * Sets up a function that will be called whenever the specified event is delivered to the target.
     * 
     * @param type 
     * @param callback 
     * @param options 
     */
    public addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        this.checkArgLength(arguments.length, "addEventListener");
        const ll: Map<string, any> = this._listenerList;
        if (!ll.has(type)) ll.set(type, new Map());
        const listenersForType: Map<any, any> = ll.get(type);
        if (!listenersForType.has(callback)) {
            // Any given listener is only registered once
            listenersForType.set(callback, options);
        }
    }

    /**
     * Removes an event listener previously registered with EventTarget.addEventListener() from the target. 
     * 
     * @param type 
     * @param callback 
     * @param options
     */
    public removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        this.checkArgLength(arguments.length, "removeEventListener");
        const ll: Map<string, any> = this._listenerList;
        if (ll.has(type)) {
            const listenersForType: Map<any, any> = ll.get(type);
            if (listenersForType.has(callback)) listenersForType.delete(callback);
        }
    }

    /**
     * Sends an Event to this EventTarget instance, (synchronously) invoking the affected event listeners in the appropriate order.
     *
     * @param event the Event object to dispatch. Its Event.target property will be set to the current EventTarget.
     * @returns true since there are no cancellable events on a base EventTarget,
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
            const listener = listnerEntry[0];
            const options: any = listnerEntry[1];
            try {
                if (typeof listener === FUNCTION_TYPE) {
                    // Listener functions must be executed with the EventTarget as the `this` context.
                    listener.call(this, event);
                } else if (listener && typeof listener.handleEvent === FUNCTION_TYPE) {
                    // Listener objects have their handleEvent method called, if they have one
                    listener.handleEvent(event);
                }
            } catch (err) {
                // We need to report the error to the global error handling event,
                // but we do not want to break the loop that is executing the events.
                // Unfortunately, this is the best we can do, which isn't great, because the
                // native EventTarget will actually do this synchronously before moving to the next
                // event in the loop.
                setTimeout(() => {
                    throw err;
                });
            }
            if (options && options.once) {
                // If this was registered with { once: true }, we need
                // to remove it now.
                listenersForType.delete(listener);
            }
        }
        return true;
    }

    private checkArgLength(argLen: number, method: string): void {
        if (argLen < 2) {
            throw new TypeError(
                `TypeError: Failed to execute '${method}' on 'EventTarget': 2 arguments required, but only ${argLen} present.`
            );
        }
    }
}