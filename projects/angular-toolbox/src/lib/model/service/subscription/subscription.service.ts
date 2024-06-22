/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in 
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionError } from '../../../core';

@Injectable({
    providedIn: 'root'
})
/**
 * A lightweight service that helps to manage unregistration issues of Angular subscriptions.
 */
export class SubscriptionService {

    /**
     * @private
     * Stores an internal reference to the last reference used with the `register()`
     * method.
     */
    private _lastRef: string | null = null;

    /**
     * @private
     * The internal `Subscription` instances storage.
     */
    private _subMap: Map<string, Array<Subscription>> = new Map<string, Array<Subscription>>();

    /**
     * Stores a new `Subscription` instance associated with the specified reference.
     * 
     * @param ref The reference for which to store a new `Subscription` instance.
     * @param subscription The `Subscription` instance to register.
     * 
     * @returns A reference to this `SubscriptionService` instance.
     */
    public register(ref: string, subscription: Subscription): SubscriptionService {
        this._lastRef = ref;
        if (!this._subMap.has(ref)) this._subMap.set(ref, []);
        this._subMap.get(ref)?.push(subscription);
        return this;
    }

    /**
     * Stores a new `Subscription` instance associated with the reference specified
     * by the last `register()` method invokation.
     * 
     * @param subscription The `Subscription` instance to register.
     * 
     * @returns A reference to this `SubscriptionService` instance.
     */
    public append(subscription: Subscription): SubscriptionService {
        if (!this._lastRef) throw new SubscriptionError("Illegal Access Error: you must call the register() method before invoking the append() method.");
        return this.register(this._lastRef, subscription);
    }
 
    /**
     * Unsubscribes and removes all `Subscription` instances associated with the specified reference.
     * 
     * @param ref The reference for which to remove all `Subscription` instances.
     * 
     * @returns `true` whether the specified reference exists; `false` otherwise.
     */
    public clearAll(ref: string): boolean {
        let result: boolean = false;
        if (this._lastRef === ref) this._lastRef = null;
        if (this._subMap.has(ref)) {
            this._subMap.get(ref)?.forEach(subscription => {
                if (!subscription.closed) subscription.unsubscribe();
             });
            this._subMap.delete(ref);
            result = true;
        }
        return result;
    }

    /**
     * Returns all `Subscription` instances associated with the specified reference.
     * 
     * @param ref The reference for which to remove get `Subscription` instances.
     * 
     * @returns All `Subscription` instances associated with the specified reference, or whether
     *          the specified reference does not exists.
     */
    public get(ref: string): Array<Subscription> | null {
        return this._subMap.get(ref) || null;
    }
}
