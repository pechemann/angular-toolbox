/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AppBridgeError } from '../../../lib/core/error/app-bridge-error';

describe('AppBridgeError', () => {
  
  const ERROR_MESSAGE: string = "Error Message";
  let error: AppBridgeError;

  beforeEach(() => {
    error = new AppBridgeError(ERROR_MESSAGE);
  });

  it('should create an instance', () => {
    expect(error).toBeTruthy();
  });

  it('should be an instance of AppBridgeError', () => {
    expect(error).toBeInstanceOf(AppBridgeError);
  });

  it('should create an AppBridgeError instance with the correct message', () => {
    expect(error.message).toEqual(ERROR_MESSAGE);
  });
  
  it('cause should be undefined', () => {
    expect(error.cause).toBeUndefined();
  });

  it('name should be "AppBridgeError"', () => {
    expect(error.name).toEqual("AppBridgeError");
  });
});
