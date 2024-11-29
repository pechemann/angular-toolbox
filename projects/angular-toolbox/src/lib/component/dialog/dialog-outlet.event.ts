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
 * Events that indicates the state changes of component managed by `DialogService` service instances.
 */
export class DialogOutletEvent {

    public static readonly SHOW: DialogOutletEventType = "show";

    public static readonly HIDE: DialogOutletEventType = "hide";

    public readonly state: DialogOutletEventType;

    public readonly config: DialogConfig | null;

    constructor(state: DialogOutletEventType, config: DialogConfig | null = null) {
        this.state = state;
        this.config = config;
    }
}