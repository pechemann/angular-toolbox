/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogServiceError } from "projects/angular-toolbox/src/public-api";

describe('DialogServiceError', () => {
  
  const ERROR_MESSAGE: string = "Error Message";
  let error: DialogServiceError;

  beforeEach(() => {
    error = new DialogServiceError(ERROR_MESSAGE);
  });

  it('should create an instance', () => {
    expect(error).toBeTruthy();
  });

  it('should be an instance of DialogServiceError', () => {
    expect(error).toBeInstanceOf(DialogServiceError);
  });

  it('should create an DialogServiceError instance with the correct message', () => {
    expect(error.message).toEqual(ERROR_MESSAGE);
  });
  
  it('cause should be undefined', () => {
    expect(error.cause).toBeUndefined();
  });

  it('name should be "DialogServiceError"', () => {
    expect(error.name).toEqual("DialogServiceError");
  });
});
