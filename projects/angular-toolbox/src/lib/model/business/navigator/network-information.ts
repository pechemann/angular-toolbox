/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in 
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConnectionType } from "./connection-type";
import { EffectiveConnectionType } from "./effective-connection-type";

/**
 * The `NetworkInformation` interface of the Network Information API provides
 * information about the connection a device is using to communicate with the network
 * and provides a means for scripts to be notified if the connection type changes.
 * The `NetworkInformation` interface cannot be instantiated. It is instead accessed
 * through the connection property of the `Navigator` interface or the `WorkerNavigator`
 * interface.
 */
export interface NetworkInformation extends EventTarget {

    /**
     * Returns the effective bandwidth estimate in megabits per second,
     * rounded to the nearest multiple of 25 kilobits per seconds.
     */
    readonly downlink: number;
    
    /**
     * Returns the effective type of the connection meaning one of the `EffectiveConnectionType` enum.
     * This value is determined using a combination of recently observed round-trip time and downlink values.
     */
    readonly effectiveType: EffectiveConnectionType;

    /**
     * Returns the type of connection a device is using to communicate with the network.
     * It will be one of the `ConnectionType` enum
     */
    readonly type: ConnectionType;
    
    /**
     * Returns the estimated effective round-trip time of the current connection,
     * rounded to the nearest multiple of 25 milliseconds.
     */
    readonly rtt: number;

    /**
     * Returns `true` iwhether the user has set a reduced data usage option on the user agent.
     * `false` otherwise.
     */
    readonly saveData: boolean;

    /**
     * The event that's fired when connection information changes.
     */
    onchange: EventListener
}