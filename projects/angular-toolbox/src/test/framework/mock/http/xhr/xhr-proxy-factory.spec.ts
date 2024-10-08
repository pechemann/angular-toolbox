/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../../lib/model/service/mock/http/http-mock.service';
import { DOCUMENT, XhrFactory } from '@angular/common';
import { httpMockFactory } from '../../../../../lib/framework/mock/http/xhr/http-mock-factory';

describe('XhrProxyFactory', () => {
  let factory: XhrFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpMockService, deps: [DOCUMENT] },
        { provide: XhrFactory, useFactory: httpMockFactory }
      ]
    });
    factory = TestBed.runInInjectionContext(httpMockFactory);
  });

  it('build() method() should create and return a new XMLHttpRequest object', () => {
    // Since it is not possible to test XMLHttpRequest as an interface,
    // XMLHttpRequest implementation will be validates through the XMLHttpRequestProxyImpl test
    // which implements the XMLHttpRequest interface.
    expect(factory.build()).toBeTruthy();
  });
});
