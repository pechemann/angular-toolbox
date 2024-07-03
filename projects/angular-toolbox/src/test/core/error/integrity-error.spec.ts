/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { IntegrityError } from '../../../lib/core/error/integrity-error';

describe('IntegrityError', () => {
  
  const ERROR_MESSAGE: string = "Error Message";
  let error: IntegrityError;

  beforeEach(() => {
    error = new IntegrityError(ERROR_MESSAGE);
  });

  it('should create an instance', () => {
    expect(error).toBeTruthy();
  });

  it('should be an instance of IntegrityError', () => {
    expect(error).toBeInstanceOf(IntegrityError);
  });

  it('should create an IntegrityError instance with the correct message', () => {
    expect(error.message).toEqual(ERROR_MESSAGE);
  });
  
  it('cause should be undefined', () => {
    expect(error.cause).toBeUndefined();
  });

  it('name should be "IntegrityError"', () => {
    expect(error.name).toEqual("IntegrityError");
  });
});
