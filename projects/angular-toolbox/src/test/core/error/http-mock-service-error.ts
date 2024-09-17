/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockServiceError } from "projects/angular-toolbox/src/public-api";

describe('HttpMockServiceError', () => {
  
  const ERROR_MESSAGE: string = "Error Message";
  let error: HttpMockServiceError;

  beforeEach(() => {
    error = new HttpMockServiceError(ERROR_MESSAGE);
  });

  it('should create an instance', () => {
    expect(error).toBeTruthy();
  });

  it('should be an instance of HttpMockServiceError', () => {
    expect(error).toBeInstanceOf(HttpMockServiceError);
  });

  it('should create a HttpMockServiceError instance with the correct message', () => {
    expect(error.message).toEqual(ERROR_MESSAGE);
  });
  
  it('cause should be undefined', () => {
    expect(error.cause).toBeUndefined();
  });

  it('name should be "HttpMockServiceError"', () => {
    expect(error.name).toEqual("HttpMockServiceError");
  });
});
