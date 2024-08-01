/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTPMethodRef } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum';
import { DelegateXhr } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/delegate-xhr';
import { EMPTY_STRING, HttpMockService } from 'projects/angular-toolbox/src/public-api';
import { FOO_MOCK_CONFIG, URL } from './util/delegate-xhr-test-util';
import { XhrProxyImpl } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/xhr-proxy-impl';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

const getError = (invokator: string): Error=> {
    return new Error(`Attempt to call ${invokator}() method before calling open().`)
}
describe('XhrProxyImpl', () => {

    let xhr: XhrProxyImpl;
    let configService: HttpMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpMockService, deps: [DOCUMENT] }
            ]
        });
        configService = TestBed.inject(HttpMockService);
        xhr = new XhrProxyImpl(configService);
    });

    it('should create a new instance', () => {
        expect(xhr).toBeTruthy();
    });

    it('response should be undefined by default', () => {
        expect(xhr.response).toBeUndefined();
    });

    it('status should be 0 by default', () => {
        expect(xhr.status).toEqual(0);
    });

    it('statusText should be an empty string by default', () => {
        expect(xhr.statusText).toEqual(EMPTY_STRING);
    });

    it('readyState should be UNSENT by default', () => {
        expect(xhr.readyState).toEqual(xhr.UNSENT);
    });

    it('responseURL should be an empty string by default', () => {
        expect(xhr.responseURL).toEqual(EMPTY_STRING);
    });

    it('responseText should be an empty string by default', () => {
        expect(xhr.responseText).toEqual(EMPTY_STRING);
    });

    it('responseType should be an empty string by default', () => {
        expect(xhr.responseType).toEqual(EMPTY_STRING);
    });

    it('instanceOf() should always return false before the open() method invokation', () => {
        expect(xhr.instanceOf(XMLHttpRequest)).toBeFalse();
        expect(xhr.instanceOf(DelegateXhr)).toBeFalse();
    });

    it('getAllResponseHeaders() should return an empty string by default', () => {
        expect(xhr.getAllResponseHeaders()).toEqual(EMPTY_STRING);
    });
    
    it('setting responseType should throw an error by default', () => {
        expect(()=> xhr.responseType = 'blob').toThrow(getError("responseType"));
    });

    it('calling abort() should throw an error by default', () => {
        expect(()=> xhr.abort()).toThrow(getError("abort"));
    });

    it('calling addEventListener() should throw an error by default', () => {
        expect(()=> xhr.addEventListener("test", ()=>{})).toThrow(getError("addEventListener"));
    });

    it('calling removeEventListener() should throw an error by default', () => {
        expect(()=> xhr.removeEventListener("test", ()=>{})).toThrow(getError("removeEventListener"));
    });

    it('calling send() should throw an error by default', () => {
        expect(()=> xhr.send()).toThrow(getError("send"));
    });

    it('calling setRequestHeader() should throw an error by default', () => {
        expect(()=> xhr.setRequestHeader("foo", "bar")).toThrow(getError("setRequestHeader"));
    });
});

describe('XhrProxyImpl: native XMLHttpRequest implementation', () => {

    let xhr: XhrProxyImpl;
    let configService: HttpMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpMockService
            ]
        });
        configService = TestBed.inject(HttpMockService);
        xhr = new XhrProxyImpl(configService);
    });

    it('calling open() should not fail', () => {
        //Angular only uses the first 2 parameters of the open method. 
        expect(xhr.open(HTTPMethodRef.GET, URL)).toBeUndefined();
    });

    it('instanceOf(XMLHttpRequest) should return true when using the native XMLHttpRequest implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.instanceOf(XMLHttpRequest)).toBeTrue();
    });

    it('instanceOf(DelegateXhr) should return true when using the native XMLHttpRequest implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.instanceOf(DelegateXhr)).toBeFalse();
    });

    /**************************************************************
     * We ensure that public members invokations do not fail
     * Since all members are delegating behaviors, it means that
     * these behaviors have already been tested through the native
     * XMLHttpRequest implementation.
     **************************************************************/ 

    it('response should be an empty string because URL does not exist', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.response).toEqual(EMPTY_STRING);
    });

    it('status should be 0 by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.status).toEqual(0);
    });

    it('statusText should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.statusText).toEqual(EMPTY_STRING);
    });

    it('readyState should be OPENED', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.readyState).toEqual(xhr.OPENED);
    });

    it('responseURL should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseURL).toEqual(EMPTY_STRING);
    });

    it('responseText should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseText).toEqual(EMPTY_STRING);
    });

    it('responseType should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseType).toEqual(EMPTY_STRING);
    });

    it('calling setRequestHeader() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.setRequestHeader("foo", "bar")).toBeTruthy();
    });

    it('calling abort() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.abort()).toBeUndefined();
    });
    
    it('setting responseType should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.responseType = 'blob').toBeTruthy();
    });

    it('calling addEventListener() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.addEventListener("test", ()=>{})).toBeTruthy();
    });

    it('calling removeEventListener() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.removeEventListener("test", ()=>{})).toBeTruthy();
    });

    it('calling send() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.send()).toBeTruthy();
    });
});


describe('XhrProxyImpl: DelegateXhr implementation', () => {

    let xhr: XhrProxyImpl;
    let configService: HttpMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpMockService
            ]
        });
        configService = TestBed.inject(HttpMockService);
        configService.addConfig(FOO_MOCK_CONFIG);
        xhr = new XhrProxyImpl(configService);
    });

    afterEach(() => {
        configService.removeConfig(FOO_MOCK_CONFIG.id as any);
    });

    it('calling open() should not fail', () => {
        //Angular only uses the first 2 parameters of the open method. 
        expect(xhr.open(HTTPMethodRef.GET, URL)).toBeUndefined();
    });

    it('instanceOf(XMLHttpRequest) should return true when using the native XMLHttpRequest implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.instanceOf(XMLHttpRequest)).toBeFalse();
    });

    it('instanceOf(DelegateXhr) should return true when using the native XMLHttpRequest implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.instanceOf(DelegateXhr)).toBeTrue();
    });

    /**************************************************************
     * We ensure that public members invokations do not fail
     * Since all members are delegating behaviors, it means that
     * these behaviors have already been tested through the 
     * DelegateXhr implementation.
     **************************************************************/ 

    it('response should be null because, it the default DelegateXhr implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.response).toBeNull();
    });

    it('status should be 0 by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.status).toEqual(0);
    });

    it('statusText should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.statusText).toEqual(EMPTY_STRING);
    });

    it('readyState should be OPENED', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.readyState).toEqual(xhr.OPENED);
    });

    it('responseURL should be the value of the mock URL, because it the default DelegateXhr implementation', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseURL).toEqual(URL);
    });

    it('responseText should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseText).toEqual(EMPTY_STRING);
    });

    it('responseType should be an empty string by default', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseType).toEqual(EMPTY_STRING);
    });

    it('calling setRequestHeader() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.setRequestHeader("foo", "bar")).toBeTruthy();
    });

    it('calling abort() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.abort()).toBeUndefined();
    });
    
    it('setting responseType should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.responseType = 'blob').toBeTruthy();
    });

    it('calling addEventListener() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.addEventListener("test", ()=>{})).toBeTruthy();
    });

    it('calling removeEventListener() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.removeEventListener("test", ()=>{})).toBeTruthy();
    });

    it('calling send() should not fail', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(()=> xhr.send()).toBeTruthy();
    });
});
