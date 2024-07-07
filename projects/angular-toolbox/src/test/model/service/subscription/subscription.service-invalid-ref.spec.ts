/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { Observable, interval } from 'rxjs';
import { SubscriptionService } from '../../../../lib/model';

describe('SubscriptionService: invalid reference', () => {
  const EXPECTED_ERROR: TypeError = new TypeError("ref must be of type of string or Identifiable");
  let service: SubscriptionService;
  let observable: Observable<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    observable = interval(400);
    service = TestBed.inject(SubscriptionService);
  });
  
  it('register() should throw an error when ref is not a string or an Identifiable object', () => {
    const invalidRegistration = ()=> service.register({} as any, observable.subscribe());
    expect(invalidRegistration).toThrow(EXPECTED_ERROR);
  });
  
  it('get() should throw an error when ref is not a string or an Identifiable object', () => {
    const invalidGet = ()=> service.get({} as any);
    expect(invalidGet).toThrow(EXPECTED_ERROR);
  });

  it('clearAll() should throw an error when ref is not a string or an Identifiable objects', () => {
    const invalidClearAll = ()=> service.clearAll({} as any);
    expect(invalidClearAll).toThrow(EXPECTED_ERROR);
  });
});
