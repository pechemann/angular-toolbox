/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in 
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Subscription } from 'rxjs';
import { Identifiable } from '../lang';

/**
 * Defines the API to implement to create Angular subscription management objects.
 */
export interface SubscriptionManager {

    /**
     * Stores a new `Subscription` instance associated with the specified reference.
     * 
     * @param ref The reference for which to store a new `Subscription` instance.
     *            Can be either a string or an `Identifiable` object.
     * @param subscription The `Subscription` instance to register.
     * 
     * @returns A reference to this `SubscriptionManager` object.
     */
    register(ref: string | Identifiable, subscription: Subscription): SubscriptionManager;

    /**
     * Stores a new `Subscription` instance associated with the reference specified
     * by the last `register()` method invokation.
     * 
     * @param subscription The `Subscription` instance to register.
     * 
     * @returns A reference to this `SubscriptionManager` object.
     */
    append(subscription: Subscription): SubscriptionManager;
 
    /**
     * Unsubscribes and removes all `Subscription` instances associated with the specified reference.
     * 
     * @param ref The reference for which to remove all `Subscription` instances.
     *            Can be either a string or an `Identifiable` object.
     * 
     * @returns `true` whether the specified reference exists; `false` otherwise.
     */
    clearAll(ref: string | Identifiable): boolean;

    /**
     * Returns all `Subscription` instances associated with the specified reference.
     * 
     * @param ref The reference for which to remove get `Subscription` instances.
     *            Can be either a string or an `Identifiable` object.
     * 
     * @returns All `Subscription` instances associated with the specified reference, or 
     *          `null` whether the specified reference does not exists.
     */
    get(ref: string | Identifiable): Array<Subscription> | null;
}
