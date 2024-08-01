/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { HttpMockService } from '../../../../../lib/model/service/mock/http/http-mock.service';
import { httpMockFactory } from '../../../../../lib/framework/mock/http/xhr/http-mock-factory';
import { DOCUMENT, XhrFactory } from '@angular/common';

describe('httpMockFactory', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpMockService, deps: [DOCUMENT] },
        { provide: XhrFactory, useFactory: httpMockFactory }
      ]
    });
  });

  it('should create a new XhrFactory concrete implementation', () => {
    const factory: XhrFactory = TestBed.runInInjectionContext(httpMockFactory);
    expect(factory).toBeInstanceOf(XhrFactory);
  });
});
