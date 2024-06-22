/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { HttpResponseMockBuilder, httpResponseMock } from '../../../../public-api';

describe('httpResponseMock', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  
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
