import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/**
 * A lightweight service that helps to manage unregistration issues of Angular subscriptions.
 */
export class SubscriptionService {

    /**
     * The internal Subscription instances storage.
     */
    private _subMap: Map<String, Array<Subscription>> = new Map<String, Array<Subscription>>();

    /**
     * Stores a new Subscription instance associated with the specified reference.
     * 
     * @param ref the reference for which to store a new Subscription instance.
     * @param subscription the Subscription instance to register.
     * @returns a reference to this SubscriptionService instance.
     */
    public register(ref: String, subscription: Subscription): SubscriptionService {
        if (!this._subMap.has(ref)) this._subMap.set(ref, []);
        this._subMap.get(ref)?.push(subscription);
        return this;
    }
 
    /**
     * Unsubscribes and removes all Subscription instances associated with the specified reference.
     * 
     * @param ref the reference for which to remove all Subscription instances.
     * @returns true whether the specified reference exists; false otherwise.
     */
    public clearAll(ref: String): boolean {
        let result: boolean = false;
        if (this._subMap.has(ref)) {
            this._subMap.get(ref)?.forEach(subscription => subscription.unsubscribe());
            this._subMap.delete(ref);
            result = true;
        }
        return result;
    }

    /**
     * Returns all Subscription instances associated with the specified reference.
     * 
     * @param ref the reference for which to remove get Subscription instances.
     * @returns all Subscription instances associated with the specified reference, or whether
     *          the specified reference does not exists.
     */
    public get(ref: String): Array<Subscription> | null {
        return this._subMap.get(ref) || null;
    }
}
