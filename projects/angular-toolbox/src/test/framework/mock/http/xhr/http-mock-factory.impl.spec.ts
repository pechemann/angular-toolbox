/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../../lib/model/service/mock/http/http-mock.service';
import { XhrProxyFactoryImpl } from '../../../../../lib/framework/mock/http/xhr/http-mock-factory.impl';
import { XhrProxyImpl } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/xhr-proxy-impl';

describe('XhrProxyFactoryImpl', () => {

  let mockService: HttpMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpMockService
      ]
    });
    mockService = TestBed.inject(HttpMockService);
  });

  it('should create a new instance', () => {
    const factory: XhrProxyFactoryImpl = new XhrProxyFactoryImpl(mockService);
    expect(factory).toBeTruthy();
  });

  it('build should return a XMLHttpRequest instance', () => {
    const factory: XhrProxyFactoryImpl = new XhrProxyFactoryImpl(mockService);
    expect(factory.build()).toBeInstanceOf(XhrProxyImpl);
  });

  it('build should return a new XMLHttpRequest instance each time', () => {
    const factory: XhrProxyFactoryImpl = new XhrProxyFactoryImpl(mockService);
    const xhr: XMLHttpRequest = factory.build();
    expect(factory.build()).not.toBe(xhr);
  });
});
