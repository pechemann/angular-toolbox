/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in 
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { AbstractSubscription } from '../../../core';

@Injectable({
    providedIn: 'root'
})
/**
 * A lightweight service that helps to manage unregistration issues of Angular subscriptions.
 */
export class SubscriptionService extends AbstractSubscription {

    /**
     * @private
     */
    constructor() {
        super();
    }
}
