/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeadersMockBuilder, httpHeadersMock } from '../../../../../public-api';

describe('httpHeadersMock', () => {
  
  it('httpHeadersMock should return an instance of HttpHeadersMockBuilder', () => {
    expect(httpHeadersMock()).toBeInstanceOf(HttpHeadersMockBuilder);
  });
  
  it('httpHeadersMock should return a different instance of HttpResponseMockBuilder each time', () => {
    const builder: HttpHeadersMockBuilder = new HttpHeadersMockBuilder();
    expect(httpHeadersMock()).not.toBe(builder);
    expect(httpHeadersMock()).not.toBe(builder);
    expect(httpHeadersMock()).not.toBe(builder);
  });
});
