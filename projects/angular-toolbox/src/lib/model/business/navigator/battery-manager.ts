/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in 
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * The `BatteryManager` interface of the Battery Status API provides information about
 * the system battery charge level. The `navigator.getBattery()` method returns a promise
 * that resolves with a `BatteryManager` interface.
 */
export interface BatteryManager extends EventTarget {

    /**
     * A boolean value indicating whether the battery is currently being charged.
     */
    readonly charging: boolean;

    /**
     * A number representing the remaining time in seconds until the battery is fully charged,
     * or 0 if the battery is already fully charged.
     */
    readonly chargingTime: number;

    /**
     * A number representing the remaining time in seconds until the battery
     * is completely discharged and the system suspends.
     */
    readonly dischargingTime: number;

    /**
     * A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
     */
    readonly level: number;

    /**
     * Fired when the battery charging state (the `charging` property) is updated.
     * 
     * @param event A generic `Event`.
     */
    onlevelchange(event: Event): void;

    /**
     * Fired when the battery charging time (the `chargingTime` property) is updated.
     * 
     * @param event A generic `Event`.
     */
    onchargingchange(event: Event): void;

    /**
     * Fired when the battery discharging time (the `dischargingTime` property) is updated.
     * 
     * @param event A generic `Event`.
     */
    chargingtimechange(event: Event): void;

    /**
     * Fired when the battery level (the `level` property) is updated.
     * 
     * @param event A generic `Event`.
     */
    dischargingtimechange(event: Event): void;
}