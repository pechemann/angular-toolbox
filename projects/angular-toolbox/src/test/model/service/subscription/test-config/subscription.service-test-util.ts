/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */
;
import { SubscriptionError } from '../../../../../lib/core/error/subscription-error';
import { AbstractIdentifiable } from '../../../../../lib/core';

class FakeService extends AbstractIdentifiable {
  constructor() {
    super();
  }
}

class FakeComponent extends AbstractIdentifiable {
  constructor() {
    super();
  }
}

export const ILLEGAL_ACCESS_ERROR: SubscriptionError =  new SubscriptionError("Illegal Access Error: you must call the register() method before invoking the append() method.");

export const FAKE_SERVICE: FakeService = new FakeService();
export const FAKE_COMPONENT: FakeComponent = new FakeComponent();