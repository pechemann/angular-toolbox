/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTPMethodRef } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum';
import { DelegateXhr } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/delegate-xhr';
import { EMPTY_STRING, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { BODY, BODY_SIZE, ERROR, HTTP_STATUS, I_M_A_TEA_POT, ROUTE_CONFIG, ROUTE_CONFIG_WITH_ERROR, URL } from './util/delegate-xhr-test-util';
import { RouteMockConfig } from 'projects/angular-toolbox/src/lib/framework/mock/http/config/route-mock-config';
import { HttpRequest } from '@angular/common/http';
import { ProgressEventMock } from 'projects/angular-toolbox/src/lib/framework/mock/http/event/progress-event-mock';

describe('DelegateXhr', () => {

    let xhr: DelegateXhr;

    beforeEach(() => {
        xhr = new DelegateXhr(ROUTE_CONFIG);
    })

    it('should create a new instance', () => {
        expect(xhr).toBeTruthy();
    });

    it('response should be null by default', () => {
        expect(xhr.response).toBeNull();
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

    it('responseURL should be undefined by default', () => {
        expect(xhr.responseURL).toBeUndefined();
    });

    it('responseText should be an empty string by default', () => {
        expect(xhr.responseText).toEqual(EMPTY_STRING);
    });

    it('responseType should return the same value as the config anyway', () => {
        const responseType: string = ROUTE_CONFIG.methodConfig.responseType as any;
        expect(xhr.responseType).toEqual(responseType);
    });

    /**************************************************************
     * Angular only uses the first 2 parameters of the open method. 
     **************************************************************/
    
    it('open() should return the same value as the config', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.responseURL).toEqual(URL);
    });

    it('open() should set ready state to OPENED', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        expect(xhr.readyState).toEqual(xhr.OPENED);
    });

    it('getAllResponseHeaders() should return an empty string by default', () => {
       expect(xhr.getAllResponseHeaders()).toEqual(EMPTY_STRING);
    });

    it('send() should pass a null body to HttpRequest object by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                responseType: "document",
                data: (request: HttpRequest<any>) => {
                    expect(request.body).toBeNull();
                    done();
                    return httpResponseMock().response();
                }
            },
            parameters: { id: "10" }
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg);
        newXhr.open(HTTPMethodRef.GET, URL);
        newXhr.send();
    });

    it('send() should pass a null body to HttpRequest object by default', (done) => {
        const TEST_BODY: string = "Test Body";
        const cfg: RouteMockConfig = {
            methodConfig: {
                responseType: "document",
                data: (request: HttpRequest<any>) => {
                    expect(request.body).toEqual(TEST_BODY);
                    done();
                    return httpResponseMock().response();
                }
            },
            parameters: { id: "10" }
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg);
        newXhr.open(HTTPMethodRef.POST, URL);
        newXhr.send(TEST_BODY);
    });

    it('send() should pass a null body to HttpRequest object when no-body method is used', (done) => {
        const TEST_BODY: string = "Test Body";
        const cfg: RouteMockConfig = {
            methodConfig: {
                responseType: "document",
                data: (request: HttpRequest<any>) => {
                    expect(request.body).toBeNull();
                    done();
                    return httpResponseMock().response();
                }
            },
            parameters: { id: "10" }
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg);
        newXhr.open(HTTPMethodRef.GET, URL);
        newXhr.send(TEST_BODY);
    });

    it('send() should set response with the reponse body parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.response).toEqual(BODY);
            done();
        }, 100);
    });

    it('send() should set status with the reponse status parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.status).toEqual(HTTP_STATUS);
            done();
        }, 100);
    });

    it('send() should set statusText with the reponse statusText parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.statusText).toEqual(I_M_A_TEA_POT);
            done();
        }, 100);
    });

    it('send() should set readyState successivly to HEADERS_RECEIVED, LOADING and DONE, when no error occurs', (done) => {
        let currentState: number = xhr.OPENED;
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === currentState + 1) currentState = readyState;
            if (currentState === xhr.DONE) {
                expect(xhr.readyState).toEqual(xhr.DONE);
                done();
            }
        };
        xhr.send();
    });

    it('send() should set responseURL with the reponse url parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.responseURL).toEqual(URL);
            done();
        }, 100);
    });

    it('send() should set responseText with the reponse text parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.responseText).toEqual(JSON.stringify(BODY));
            done();
        }, 100);
    });

    it('send() should set responseType with the reponse responseType parameter', (done) => {
        const responseType: any = ROUTE_CONFIG.methodConfig.responseType;
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.responseType).toEqual(responseType);
            done();
        }, 100);
    });

    it('getAllResponseHeaders() should return the response header values when the send() method is invoked', (done) => {
        const expected: string = `Cache-Control: no-cache
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: ${navigator.language}
Priority: u=0, i
User-Agent: ${navigator.userAgent}`;
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.getAllResponseHeaders()).toEqual(expected);
            done();
        }, 100);
    });

    it('abort() should set ready state to UNSENT', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.abort();
        expect(xhr.readyState).toEqual(xhr.UNSENT);
    });

    it('abort() should dispatch an event of type abort', () => {
        const expected: Event = new Event("abort");
        xhr.open(HTTPMethodRef.GET, URL);
        spyOn(xhr, "dispatchEvent");
        xhr.abort();
        expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
    });

    it('abort() should set status to 0', () => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.abort();
        expect(xhr.status).toEqual(0);
    });

    it('setRequestHeader() should do nothing before the send() method invokaton', () => {
        xhr.setRequestHeader("foo", "bar");
        expect(xhr.getAllResponseHeaders()).toEqual(EMPTY_STRING);
    });

    it('setRequestHeader() should add headers after the send() method invokaton', (done) => {
        const expected: string = `Cache-Control: no-cache
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: ${navigator.language}
Priority: u=0, i
User-Agent: ${navigator.userAgent}
foo: bar`;
        xhr.setRequestHeader("foo", "bar");
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.getAllResponseHeaders()).toEqual(expected);
            done();
        }, 100);
    });

    it('DONE state should be invoked after the specified delay duration', (done) => {
        let start: number = 0;
        const cfg: RouteMockConfig = {
            methodConfig: {
                responseType: "document",
                data: (request: HttpRequest<any>) => {
                    return httpResponseMock().delay(1000).response();
                }
            },
            parameters: { id: "10" }
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg);
        newXhr.open(HTTPMethodRef.GET, URL);
        newXhr.send();
        const interval = setInterval(()=> {
            start += 100;
            if (start < 1000) {
                expect(newXhr.readyState).not.toEqual(newXhr.DONE);
            } else {
                clearInterval(interval);
                expect(newXhr.readyState).toEqual(newXhr.DONE);
                done();
            }
        }, 100);
    });

    it('send() should dispatch a load event when done', (done) => {
        const expected: ProgressEventMock = new ProgressEventMock("load");
        expected.total = BODY_SIZE;
        expected.loaded = BODY_SIZE;
        spyOn(xhr, "dispatchEvent");
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
            done();
        }, 100);
    });
});

describe('DelegateXhr: error response', () => {

    let xhr: DelegateXhr;

    beforeEach(() => {
        xhr = new DelegateXhr(ROUTE_CONFIG_WITH_ERROR);
    });

    it('send() should set readyState successivly to HEADERS_RECEIVED and DONE, when an error occurs', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === xhr.LOADING) fail('LOADING cannot be set whith error responses');
            if (readyState === xhr.DONE) {
                expect(xhr.readyState).toEqual(xhr.DONE);
                done();
            }
        };
        xhr.send();
    });

    it('send() should set status with the error status', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.status).toEqual(ERROR.status);
            done();
        }, 100);
    });

    it('send() should set statusText with the error status text', (done) => {
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.statusText).toEqual(ERROR.statusText);
            done();
        }, 100);
    });

    it('send() should dispatch an error event', (done) => {
        const expected: ProgressEventMock = new ProgressEventMock("error");
        expected.total = BODY_SIZE;
        spyOn(xhr, "dispatchEvent");
        xhr.open(HTTPMethodRef.GET, URL);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
            done();
        }, 100);
    });
});