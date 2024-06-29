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
import { AbstractIdentifiable } from '../../../core/impl';
import { EMPTY_STRING } from '../../../util';
import { Identifiable } from '../../business';

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
     *            Can be either a string or an "Identifiable" object.
     * @param subscription The `Subscription` instance to register.
     * 
     * @returns A reference to this `SubscriptionService` instance.
     */
    public register(ref: string | Identifiable, subscription: Subscription): SubscriptionService {
        const REF: string = this.getRef(ref);
        this._lastRef = REF;
        if (!this._subMap.has(REF)) this._subMap.set(REF, []);
        this._subMap.get(REF)?.push(subscription);
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
     *            Can be either a string or an "Identifiable" object.
     * 
     * @returns `true` whether the specified reference exists; `false` otherwise.
     */
    public clearAll(ref: string | Identifiable): boolean {
        const REF: string = this.getRef(ref);
        let result: boolean = false;
        if (this._lastRef === REF) this._lastRef = null;
        if (this._subMap.has(REF)) {
            this._subMap.get(REF)?.forEach(subscription => {
                if (!subscription.closed) subscription.unsubscribe();
             });
            this._subMap.delete(REF);
            result = true;
        }
        return result;
    }

    /**
     * Returns all `Subscription` instances associated with the specified reference.
     * 
     * @param ref The reference for which to remove get `Subscription` instances.
     *            Can be either a string or an "Identifiable" object.
     * 
     * @returns All `Subscription` instances associated with the specified reference, or whether
     *          the specified reference does not exists.
     */
    public get(ref: string | Identifiable): Array<Subscription> | null {
        return this._subMap.get(this.getRef(ref)) || null;
    }

    /**
     * @private 
     * Returns the string reference for the regsitration process. 
     * 
     * @param ref The reference to be used the regsitration process. 
     *            Can be either a string or an "Identifiable" object.
     * 
     * @returns the string reference for the regsitration process. 
     */
    private getRef(ref: string | Identifiable): string {
        let targetRef: string;
        if (typeof ref === "string") targetRef = ref;
        else if (ref instanceof AbstractIdentifiable) targetRef = ref.getID().toString();
        else throw new TypeError("ref must be of type of string or Identifiable");
        return targetRef;
    }
}
