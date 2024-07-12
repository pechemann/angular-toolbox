/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */
;
import { SubscriptionError } from '../../../../lib/core/error/subscription-error';
import { AbstractSubscription, IdentifiableComponent } from '../../../../lib/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomSubscriptionService extends AbstractSubscription {
  constructor() {
    super();
  }
}

class FakeService extends IdentifiableComponent {
  constructor() {
    super();
  }
}

class FakeComponent extends IdentifiableComponent {
  constructor() {
    super();
  }
}

export const ILLEGAL_ACCESS_ERROR: SubscriptionError =  new SubscriptionError("Illegal Access Error: you must call the register() method before invoking the append() method.");

export const FAKE_SERVICE: FakeService = new FakeService();
export const FAKE_COMPONENT: FakeComponent = new FakeComponent();