/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { SubscriptionError } from '../../../lib/core/error/subscription-error';

describe('SubscriptionError', () => {
  
  const ERROR_MESSAGE: string = "Error Message";
  let error: SubscriptionError;

  beforeEach(() => {
    error = new SubscriptionError(ERROR_MESSAGE);
  });

  it('should create an instance', () => {
    expect(error).toBeTruthy();
  });

  it('should be an instance of SubscriptionError', () => {
    expect(error).toBeInstanceOf(SubscriptionError);
  });

  it('should create a SubscriptionError instance with the correct message', () => {
    expect(error.message).toEqual(ERROR_MESSAGE);
  });
  
  it('cause should be undefined', () => {
    expect(error.cause).toBeUndefined();
  });

  it('name should be "SubscriptionError"', () => {
    expect(error.name).toEqual("SubscriptionError");
  });
});
