/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogOutletEventType } from "./dialog-outlet-event-type";
import { DialogConfig } from "./dialog.config";

/**
 * Event that indicates the state changes of components managed by the `DialogService` service singleton.
 */
export class DialogOutletEvent {

    /**
     * The type of event dispatched each time the dialog element is displayed.
     */
    public static readonly SHOW: DialogOutletEventType = "show";

    /**
     * The type of event dispatched each time the dialog element is removed.
     */
    public static readonly HIDE: DialogOutletEventType = "hide";

    /**
     * A `DialogOutletEventType` value that indicates the state of the dialog element.
     */
    public readonly state: DialogOutletEventType;

    /**
     * The dialog element config associated with an event of type of `"show"`. 
     * `config` is set to  `null` when the event is of type of `"hide"`.
     */
    public readonly config: DialogConfig | null;

    /**
     * @private
     * 
     * Creates a new `DialogOutletEvent` instance.
     * 
     * @param state The state of the dialog element.
     * @param config  The dialog element config associated with this event.
     */
    constructor(state: DialogOutletEventType, config: DialogConfig | null = null) {
        this.state = state;
        this.config = config;
    }
}