/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpStatusCode } from '@angular/common/http';
import { HttpMockErrorImpl } from '../../../../../../lib/model/business/impl/mock/http/http-mock-error.impl';
import { EMPTY_STRING } from '../../../../../../public-api';

describe('HttpMockErrorImpl', () => {

  let error: HttpMockErrorImpl;

  it('should create an instance', () => {
    error = new HttpMockErrorImpl(HttpStatusCode.ExpectationFailed, EMPTY_STRING);
    expect(error).toBeTruthy();
  });
  
  it('should throw a new RangeError when HTTP status is lower than 400', () => {
    const status: HttpStatusCode[] = Object.values(HttpStatusCode) as any;
    status.filter((status: HttpStatusCode) => status < 400).forEach((status: HttpStatusCode) => {
      const testMethod = () => new HttpMockErrorImpl(status, EMPTY_STRING);
      expect(testMethod).toThrow(new RangeError("Error status must be equal to, or greater than 400; current is: " + status));
    });
  });
  
  it('should nnt throw a new RangeError when HTTP status is greater than, or equal to 400', () => {
    const status: HttpStatusCode[] = Object.values(HttpStatusCode) as any;
    status.filter((status: HttpStatusCode) => status >= 400).forEach((status: HttpStatusCode) => {
      const testMethod = () => new HttpMockErrorImpl(status, EMPTY_STRING);
      expect(testMethod).not.toThrow(new RangeError("Error status must be equal to, or greater than 400; current is: " + status));
    });
  });
  
  it('should return the status text as specified by the "statusText" parameter', () => {
    const badRequest: string = "Bad Request";
    const status: HttpStatusCode[] = Object.values(HttpStatusCode) as any;
    error = new HttpMockErrorImpl(HttpStatusCode.BadRequest, badRequest);
    expect(error.statusText).toEqual(badRequest);
  });
});
