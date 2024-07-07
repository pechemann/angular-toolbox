/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { XhrBase } from '../../../../../lib/framework/mock/http/xhr/xhr-base';

describe('XhrBase', () => {
  let baseClassInstance: XhrBase;

  beforeEach(() => {
    baseClassInstance = new XhrBase();
  });

  it('should be created', () => {
    expect(baseClassInstance).toBeTruthy();
  });

  it('should "UNSENT" equal to 0', () => {
    expect(baseClassInstance.UNSENT).toEqual(0);
  });
  
  it('should "OPENED" equal to 1', () => {
    expect(baseClassInstance.OPENED).toEqual(1);
  });
  
  it('should "HEADERS_RECEIVED" equal to 2', () => {
    expect(baseClassInstance.HEADERS_RECEIVED).toEqual(2);
  });

  it('should "LOADING" equal to 3', () => {
    expect(baseClassInstance.LOADING).toEqual(3);
  });

  it('should "DONE" equal to 4', () => {
    expect(baseClassInstance.DONE).toEqual(4);
  });

  it('should withCredentials to be false', () => {
    expect(baseClassInstance.withCredentials).toBeFalse();
  });

  it('should timeout to be undefined', () => {
    expect(baseClassInstance.timeout).toBeUndefined();
  });
  
  it('should onabort to be null', () => {
    expect(baseClassInstance.onabort).toBeNull();
  });
  
  it('should onerror to be null', () => {
    expect(baseClassInstance.onerror).toBeNull();
  });
  
  it('should onload to be null', () => {
    expect(baseClassInstance.onload).toBeNull();
  });
  
  it('should onloadend to be null', () => {
    expect(baseClassInstance.onloadend).toBeNull();
  });
  
  it('should onloadstart to be null', () => {
    expect(baseClassInstance.onloadstart).toBeNull();
  });
  
  it('should onprogress to be null', () => {
    expect(baseClassInstance.onprogress).toBeNull();
  });
  
  it('should onreadystatechange to be null', () => {
    expect(baseClassInstance.onreadystatechange).toBeNull();
  });
  
  it('should ontimeout to be null', () => {
    expect(baseClassInstance.ontimeout).toBeNull();
  });
  
  it('getResponseHeader() should return null', () => {
    expect(baseClassInstance.getResponseHeader("test")).toBeNull();
  });
  
  it('overrideMimeType() should be defined', () => {
    expect(baseClassInstance.overrideMimeType).toBeDefined();
  });
});
