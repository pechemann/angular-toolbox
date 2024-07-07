/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { TestBed } from '@angular/core/testing';
import { Observable, interval } from 'rxjs';
import {  SubscriptionService } from '../../../../lib/model';
import { FAKE_COMPONENT, FAKE_SERVICE, ILLEGAL_ACCESS_ERROR } from './test-config/subscription.service-test-util';

describe('SubscriptionService: Instantiable reference', () => {
  let service: SubscriptionService;
  let observable1: Observable<number>;
  let observable2: Observable<number>;
  let observable3: Observable<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    observable1 = interval(400);
    observable2 = interval(300);
    observable3 = interval(100);
    service = TestBed.inject(SubscriptionService);
  });

  afterEach(() => {
    service.clearAll(FAKE_COMPONENT);
    service.clearAll(FAKE_SERVICE);
  });
  
  it('register() should return a reference to the SubscriptionService instance', () => {
    const result = service.register(FAKE_COMPONENT, observable1.subscribe());
    expect(service).toEqual(result);
  });
  
  it('get() should return an array with the registered subscriptions', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(FAKE_COMPONENT, subscription1).register(FAKE_COMPONENT, subscription2);
    const result = service.get(FAKE_COMPONENT) as any;
    expect(result[0]).toEqual(subscription1);
    expect(result[1]).toEqual(subscription2);
  });

  it('register() should create seperated storage for each references', () => {
    const subscription1 = observable1.subscribe();
    service.register(FAKE_COMPONENT, subscription1).register(FAKE_SERVICE, subscription1);
    expect(service.get(FAKE_COMPONENT)).not.toBe(service.get(FAKE_SERVICE));
  });

  it('append() should throw an error if register() method have not be called before', () => {
    const subscription1 = observable1.subscribe();
    expect(()=> service.append(subscription1)).toThrow(ILLEGAL_ACCESS_ERROR);
  });
  
  it('get() should return null whether ref does not exist', () => {
    expect(service.get(FAKE_COMPONENT)).toBeNull();
  });
  
  it('append() should register subscriptions with the reference passed to the register() method during the last invokation', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(FAKE_COMPONENT, subscription1).append(subscription2);
    expect(service.get(FAKE_COMPONENT)).toContain(subscription2);
  });

  it('clearAll() should return false whether ref does not exist', () => {
    expect(service.clearAll(FAKE_COMPONENT)).toBeFalse();
  });
  
  it('clearAll() should return true whether ref exists', () => {
    service.register(FAKE_COMPONENT, observable1.subscribe());
    expect(service.clearAll(FAKE_COMPONENT)).toBeTrue();
  });
  
  it('clearAll() should unsubscribe all subscriptions for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    expect((subscription1 as any).isStopped).toBeFalse();
    service.register(FAKE_COMPONENT, subscription1);
    service.clearAll(FAKE_COMPONENT);
    expect((subscription1 as any).isStopped).toBeTrue();
  });
  
  it('clearAll() should remove all subscriptions for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    service.register(FAKE_COMPONENT, subscription1);
    service.clearAll(FAKE_COMPONENT);
    expect(service.get(FAKE_COMPONENT)).toBeNull();
  });
  
  it('clearAll() should preserve subscriptions for other references', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(FAKE_COMPONENT, subscription1).register(FAKE_SERVICE, subscription1).register(FAKE_SERVICE, subscription2);
    service.clearAll(FAKE_COMPONENT);
    const result = service.get(FAKE_SERVICE) as any;
    expect(result[0]).toEqual(subscription1);
    expect(result[1]).toEqual(subscription2);
  });

  it('clearAll() should destroy reference to the last register() invokation for the specified reference', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    service.register(FAKE_COMPONENT, subscription1);
    service.clearAll(FAKE_COMPONENT);
    expect(()=> service.append(subscription2)).toThrow(ILLEGAL_ACCESS_ERROR);
  });
  
  it('clearAll() should preserve reference to the last register() invokation for when the "ref" parameter does not match this reference reference', () => {
    const subscription1 = observable1.subscribe();
    const subscription2 = observable2.subscribe();
    const subscription3 = observable3.subscribe();
    service.register(FAKE_COMPONENT, subscription1);
    service.register(FAKE_SERVICE, subscription2);
    service.clearAll(FAKE_COMPONENT);
    service.append(subscription3);
    const result = service.get(FAKE_SERVICE) as any;
    expect(result[1]).toEqual(subscription3);
  });
});
