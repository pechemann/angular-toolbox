/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpResponseMockBuilder, httpResponseMock } from '../../../../../public-api';

describe('httpResponseMock', () => {
  
  it('httpResponseMock should return an instance of HttpResponseMockBuilder', () => {
    expect(httpResponseMock()).toBeInstanceOf(HttpResponseMockBuilder);
  });
  
  it('httpResponseMock should return a different instance of HttpResponseMockBuilder each time', () => {
    const builder: HttpResponseMockBuilder = httpResponseMock();
    expect(httpResponseMock()).not.toBe(builder);
    expect(httpResponseMock()).not.toBe(builder);
    expect(httpResponseMock()).not.toBe(builder);
  });
});
