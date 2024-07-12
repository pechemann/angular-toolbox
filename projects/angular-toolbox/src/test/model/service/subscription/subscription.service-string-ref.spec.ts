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
import { ILLEGAL_ACCESS_ERROR } from '../../../core/subscription/test-config/subscription.service-test-util';

describe('SubscriptionService: string reference', () => {
  let service: SubscriptionService;
  let observable1: Observable<number>;
  let observable2: Observable<number>;
  let observable3: Observable<number>;
  const ref1: string = 'ref1';
  const ref2: string = 'ref2';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    observable1 = interval(400);
    observable2 = interval(300);
    observable3 = interval(100);
    service = TestBed.inject(SubscriptionService);
  });

  afterEach(() => {
    service.clearAll(ref1);
    service.clearAll(ref2);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
  
  it('register() should return a reference to the SubscriptionService instance', () => {
    const result = service.register(ref1, observable1.subscribe());
    expect(service).toEqual(result);
  });
  
  it('get() should return an array with the registered subscriptions', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(ref1, subscription1).register(ref1, subscription2);
    const result = service.get(ref1) as any;
    expect(result[0]).toEqual(subscription1);
    expect(result[1]).toEqual(subscription2);
  });

  it('register() should create seperated storage for each references', () => {
    const subscription1 = observable1.subscribe();
    service.register(ref1, subscription1).register(ref2, subscription1);
    expect(service.get(ref1)).not.toBe(service.get(ref2));
  });

  it('append() should throw an error if register() method have not be called before', () => {
    const subscription1 = observable1.subscribe();
    expect(()=> service.append(subscription1)).toThrow(ILLEGAL_ACCESS_ERROR);
  });
  
  it('get() should return null whether ref does not exist', () => {
    expect(service.get(ref1)).toBeNull();
  });
  
  it('append() should register subscriptions with the reference passed to the register() method during the last invokation', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(ref1, subscription1).append(subscription2);
    expect(service.get(ref1)).toContain(subscription2);
  });

  it('clearAll() should return false whether ref does not exist', () => {
    expect(service.clearAll(ref1)).toBeFalse();
  });
  
  it('clearAll() should return true whether ref exists', () => {
    service.register(ref1, observable1.subscribe());
    expect(service.clearAll(ref1)).toBeTrue();
  });
  
  it('clearAll() should unsubscribe all subscriptions for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    expect((subscription1 as any).isStopped).toBeFalse();
    service.register(ref1, subscription1);
    service.clearAll(ref1);
    expect((subscription1 as any).isStopped).toBeTrue();
  });
  
  it('clearAll() should remove all subscriptions for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    service.register(ref1, subscription1);
    service.clearAll(ref1);
    expect(service.get(ref1)).toBeNull();
  });
  
  it('clearAll() should preserve subscriptions for other references', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(ref1, subscription1).register(ref2, subscription1).register(ref2, subscription2);
    service.clearAll(ref1);
    const result = service.get(ref2) as any;
    expect(result[0]).toEqual(subscription1);
    expect(result[1]).toEqual(subscription2);
  });

  it('clearAll() should destroy reference to the last register() invokation for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(ref1, subscription1);
    service.clearAll(ref1);
    expect(()=> service.append(subscription2)).toThrow(ILLEGAL_ACCESS_ERROR);
  });
  
  it('clearAll() should preserve reference to the last register() invokation for when the "ref" parameter does not match this reference reference', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    const subscription3 = observable3.subscribe();
    service.register(ref1, subscription1);
    service.register(ref2, subscription2);
    service.clearAll(ref1);
    service.append(subscription3);
    const result = service.get(ref2) as any;
    expect(result[1]).toEqual(subscription3);
  });
});
