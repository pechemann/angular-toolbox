/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTPMethodRef } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-method-ref.enum';
import { DelegateXhr } from 'projects/angular-toolbox/src/lib/framework/mock/http/xhr/delegate-xhr';
import { EMPTY_STRING, HttpMockLoggingService, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { BODY, BODY_SIZE, buildUrlSearchParamsMock, ERROR, HTTP_ERROR, HTTP_STATUS, I_M_A_TEA_POT, OBSERVABLE_ERROR_CONFIG, OBSERVABLE_MOCK_CONFIG, ROUTE_CONFIG, ROUTE_CONFIG_WITH_ERROR, URL_STRING, DESTROY_DELAY } from './util/delegate-xhr-test-util';
import { RouteMockConfig } from 'projects/angular-toolbox/src/lib/framework/mock/http/config/route-mock-config';
import { HttpParams, HttpRequest } from '@angular/common/http';
import { ProgressEventMock } from 'projects/angular-toolbox/src/lib/framework/mock/http/event/progress-event-mock';
import { TestBed } from '@angular/core/testing';
import { HttpMockLoggingMetadataBuilder } from 'projects/angular-toolbox/src/lib/framework/mock/http/logging/http-mock-logging-metadata.builder';

const EXPECTED_HEADERS: string = `Cache-Control: no-cache\r\nAccept-Encoding: gzip, deflate, br, zstd\r\nAccept-Language: ${navigator.language}\r\nPriority: u=0, i\r\nUser-Agent: ${navigator.userAgent}`;

describe('DelegateXhr', () => {

    let xhr: DelegateXhr;
    let logger: HttpMockLoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpMockLoggingService]
        });
        logger = TestBed.inject(HttpMockLoggingService);
        xhr = new DelegateXhr(ROUTE_CONFIG, logger);
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
    
    /**************************************************************
     * Angular only uses the first 2 parameters of the open method. 
     **************************************************************/
    
    it('open() should return the same value as the config', () => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        expect(xhr.responseURL).toEqual(URL_STRING);
    });

    it('open() should set ready state to OPENED', () => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        expect(xhr.readyState).toEqual(xhr.OPENED);
    });

    it('getAllResponseHeaders() should return null by default before calling the send method', () => {
        expect(xhr.getAllResponseHeaders()).toBeNull();
    });

    it('getAllResponseHeaders() should return null by default after calling the send method', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        expect(xhr.getAllResponseHeaders()).toBeNull();
        setTimeout(done, DESTROY_DELAY);
    });

    it('send() should pass a null body to HttpRequest object by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.body).toBeNull();
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: { id: "10" },
            searchParams: buildUrlSearchParamsMock()
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg, logger);
        newXhr.open(HTTPMethodRef.GET, URL_STRING);
        newXhr.send();
    });

    it('send() should pass a null body to HttpRequest object by default', (done) => {
        const TEST_BODY: string = "Test Body";
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.body).toEqual(TEST_BODY);
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: { id: "10" },
            searchParams: buildUrlSearchParamsMock()
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg, logger);
        newXhr.open(HTTPMethodRef.POST, URL_STRING);
        newXhr.send(TEST_BODY);
    });

   it('send() should set response with the reponse body parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.response).toEqual(BODY);
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });

    it('send() should set status with the reponse status parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.status).toEqual(HTTP_STATUS);
            done();
        }, 100);
    });

    it('send() should set statusText with the reponse statusText parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.statusText).toEqual(I_M_A_TEA_POT);
            done();
        }, 100);
    });

    it('send() should set readyState successivly to HEADERS_RECEIVED, LOADING and DONE, when no error occurs', (done) => {
        let currentState: number = xhr.OPENED;
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === currentState + 1) currentState = readyState;
            if (currentState === xhr.DONE) {
                expect(xhr.readyState).toEqual(xhr.DONE);
                setTimeout(done, DESTROY_DELAY);
            }
        };
        xhr.send();
    });

    it('send() should set responseURL with the reponse url parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.responseURL).toEqual(URL_STRING);
            done();
        }, 100);
    });

    it('send() should set responseText with the reponse text parameter', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.responseText).toEqual(JSON.stringify(BODY));
            done();
        }, 100);
    });

    it('abort() should set ready state to UNSENT', () => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.abort();
        expect(xhr.readyState).toEqual(xhr.UNSENT);
    });

    it('abort() should dispatch an event of type abort', () => {
        const expected: Event = new Event("abort");
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        spyOn(xhr, "dispatchEvent");
        xhr.abort();
        expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
    });

    it('abort() should set status to 0', () => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.abort();
        expect(xhr.status).toEqual(0);
    });

    it('DONE state should be invoked after the specified delay duration', (done) => {
        let start: number = 0;
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: () => {
                    return httpResponseMock().delay(1000).response();
                }
            },
            parameters: { id: "10" },
            searchParams: buildUrlSearchParamsMock()
        };
        const newXhr: DelegateXhr = new DelegateXhr(cfg, logger);
        newXhr.open(HTTPMethodRef.GET, URL_STRING);
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
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
            done();
        }, 100);
    });
});

describe('DelegateXhr: error response', () => {
    
    let xhr: DelegateXhr;
    let logger: HttpMockLoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpMockLoggingService]
        });
        logger = TestBed.inject(HttpMockLoggingService);
        xhr = new DelegateXhr(ROUTE_CONFIG_WITH_ERROR, logger);
    });

    it('send() should set readyState successivly to HEADERS_RECEIVED and DONE, when an error occurs', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === xhr.LOADING) fail('LOADING cannot be set whith error responses');
            if (readyState === xhr.DONE) {
                expect(xhr.readyState).toEqual(xhr.DONE);
                setTimeout(done, DESTROY_DELAY);
            }
        };
        xhr.send();
    });

    it('send() should set status with the error status', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.status).toEqual(ERROR.status);
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });

    it('send() should set statusText with the error status text', (done) => {
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.statusText).toEqual(ERROR.statusText);
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });

    it('send() should dispatch an error event', (done) => {
        const expected: ProgressEventMock = new ProgressEventMock("error");
        expected.total = BODY_SIZE;
        spyOn(xhr, "dispatchEvent");
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(xhr.dispatchEvent).toHaveBeenCalledWith(expected);
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
});

describe('DelegateXhr: observable responses', () => {

    let xhr: DelegateXhr;
    let logger: HttpMockLoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpMockLoggingService]
        });
        logger = TestBed.inject(HttpMockLoggingService);
    });

    it('send() should return the correct response when using Observables', (done) => {
        xhr = new DelegateXhr(OBSERVABLE_MOCK_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === xhr.DONE) {
                expect(xhr.status).toEqual(HTTP_STATUS);
                expect(xhr.statusText).toEqual(I_M_A_TEA_POT);
                expect(xhr.responseURL).toEqual(URL_STRING);
                expect(xhr.responseText).toEqual(JSON.stringify(BODY));
                expect(xhr.getAllResponseHeaders()).toEqual(EXPECTED_HEADERS);
                setTimeout(done, DESTROY_DELAY);
            }
        };
        xhr.send();
    });
    
    it('send() should send correct error status when Observables throw an error', (done) => {
        xhr = new DelegateXhr(OBSERVABLE_ERROR_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.onreadystatechange = ()=> {
            const readyState = xhr.readyState;
            if (readyState === xhr.DONE) {
                expect(xhr.status).toEqual(HTTP_ERROR.status);
                expect(xhr.statusText).toEqual(HTTP_ERROR.statusText);
                setTimeout(done, DESTROY_DELAY);
            }
        };
        xhr.send();
    });
});

describe('DelegateXhr: request object', () => {

    let xhr: DelegateXhr;
    let logger: HttpMockLoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpMockLoggingService]
        });
        logger = TestBed.inject(HttpMockLoggingService);
    });
    
    it('the HttpRequest.params Map should be empty by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    const params: HttpParams = request.params;
                    expect(request.params.keys().length).toEqual(0);
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });
    
    it('search parameters should be available from the HttpRequest.params Map', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    const params: HttpParams = request.params;
                    expect(params.get("id")).toEqual("10");
                    expect(params.get("age")).toEqual("20");
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock(['id', "10"], ['age', "20"])
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('HttpRequest object should not have any request headers by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.headers.keys().length).toEqual(0);
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('setRequestHeader() should add headers to the HttpRequest object after the send() method invokaton', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.headers.get("Cache-Control")).toEqual("no-cache");
                    expect(request.headers.get("Accept-Encoding")).toEqual("gzip, deflate, br, zstd");
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br, zstd");
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });
    
    it('setRequestHeader() should add headers to the HttpRequest object after the send() method invokaton', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.headers.get("Cache-Control")).toEqual("no-cache");
                    expect(request.headers.get("Accept-Encoding")).toEqual("gzip, deflate, br, zstd");
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br, zstd");
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('withCredentials should be false by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.withCredentials).toBeFalse();
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('withCredentials should correspond to the xhr.withCredentials value', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.withCredentials).toBeTrue();
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.withCredentials = true;
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });
    
    it('responseType should be an empty string by default, but set to "json" by Angular', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.responseType).toEqual( "json");
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('responseType should correspond to the xhr.responseType value', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.responseType).toEqual("arraybuffer");
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.responseType = "arraybuffer";
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('reportProgress should be false by default', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.reportProgress).toBeFalse();
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        xhr = new DelegateXhr(cfg, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });

    it('reportProgress should be true when usin progress event listeners', (done) => {
        const cfg: RouteMockConfig = {
            methodConfig: {
                data: (request: HttpRequest<any>) => {
                    expect(request.reportProgress).toBeTrue();
                    xhr.removeEventListener("progress", mockEvt);
                    setTimeout(done, DESTROY_DELAY);
                    return httpResponseMock().response();
                }
            },
            parameters: {},
            searchParams: buildUrlSearchParamsMock()
        };
        const mockEvt = ()=> {};
        xhr = new DelegateXhr(cfg, logger);
        xhr.addEventListener("progress", mockEvt);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
    });
});


describe('DelegateXhr: logging', () => {

    let xhr: DelegateXhr;
    let logger: HttpMockLoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpMockLoggingService]
        });
        logger = TestBed.inject(HttpMockLoggingService);
    });
    
    it('direct response should send info log to the logger when the HTTP response is available', (done) => {
        spyOn(logger, "info");
        xhr = new DelegateXhr(ROUTE_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(logger.info).toHaveBeenCalled();
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
    
    it('direct response should send error log to the logger when the HTTP response is available', (done) => {
        spyOn(logger, "error");
        xhr = new DelegateXhr(ROUTE_CONFIG_WITH_ERROR, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(logger.error).toHaveBeenCalled();
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
    
    it('observable response should send info log to the logger when the HTTP response is available', (done) => {
        spyOn(logger, "info");
        xhr = new DelegateXhr(OBSERVABLE_MOCK_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(logger.info).toHaveBeenCalled();
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
    
    it('observable response should send error log to the logger when the HTTP response is available', (done) => {
        spyOn(logger, "error");
        xhr = new DelegateXhr(OBSERVABLE_ERROR_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(logger.error).toHaveBeenCalled();
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
    
    it('should invove the HttpMockLoggingMetadataBuilder.build() method the send error log to the logger', (done) => {
        // This ensures that correct metadata are sent to the logger since the
        // HttpMockLoggingMetadataBuilder.build() has its own test suite:
        spyOn(HttpMockLoggingMetadataBuilder, "build");
        xhr = new DelegateXhr(OBSERVABLE_ERROR_CONFIG, logger);
        xhr.open(HTTPMethodRef.GET, URL_STRING);
        xhr.send();
        setTimeout(()=> {
            expect(HttpMockLoggingMetadataBuilder.build).toHaveBeenCalled();
            setTimeout(done, DESTROY_DELAY);
        }, 100);
    });
});