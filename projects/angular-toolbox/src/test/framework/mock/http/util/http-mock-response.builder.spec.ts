/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTP_MOCK_MAX_DELAY, HttpResponseMockBuilder, HttpStatusText, NUMBER } from '../../../../../public-api';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';

const BODY: string = 'Body test';
const STATUS: number = HttpStatusCode.Accepted;
const STATUS_TEXT: HttpStatusText = HttpStatusText.I_M_A_TEAPOT;
const URL: string = '/test/url';
const DELAY: number = 1500;
const HEADERS: HttpHeaders = new HttpHeaders();
const BODY_OBJ: any = { data: 'Body test' };

describe('HttpResponseMockBuilder', () => {

  let builder: HttpResponseMockBuilder;

  beforeEach(() => {
    builder = new HttpResponseMockBuilder();
  });
  
  it('should create an instance', () => {
    expect(builder).toBeTruthy();
  });
  
  it('response() method should return a new object', () => {
    expect(builder.response()).toBeTruthy();
  });

  it('response() method should create a HttpResponseMock with "url" property set to "null"', () => {
    expect(builder.response().url).toBeNull();
  });

  it('response() method should create a HttpResponseMock with "body" property set to "null"', () => {
    expect(builder.response().body).toBeNull();
  });

  it('response() method should create a HttpResponseMock with "headers" property set to "undefined"', () => {
    expect(builder.response().headers).toBeUndefined();
  });

  it('response() method should create a HttpResponseMock with "status" property set to "undefined"', () => {
    expect(builder.response().status).toEqual(HttpStatusCode.Ok);
  });
  
  it('response() method should create a HttpResponseMock with "status" property set to HttpStatusText.OK', () => {
    expect(builder.response().statusText).toEqual(HttpStatusText.OK);
  });

  it('response() method should create a HttpResponseMock with default "delay" equal to 0', () => {
    expect(builder.response().delay).toEqual(0);
  });
  
  it('body() method should set the "body" property of the response object', () => {
    expect(builder.body(BODY).response().body).toEqual(BODY);
  });
  
  it('body() method should update the "body" property of the response object', () => {
    builder.body(BODY);
    expect(builder.response().body).toEqual(BODY);
    const anotherBody: string = "Another body";
    builder.body(anotherBody);
    expect(builder.response().body).toEqual(anotherBody);
  });

  it('body() method should set the "body" property of the response object for any kind of objects', () => {
    expect(builder.body(BODY_OBJ).response().body).toEqual(BODY_OBJ);
  });
  
  it('body() method should update the "body" property of the response object for any kind of objects', () => {
    builder.body(BODY);
    expect(builder.response().body).toEqual(BODY);
    builder.body(BODY_OBJ);
    expect(builder.response().body).toEqual(BODY_OBJ);
  });

  it('status() method should set the "status" property of the response object', () => {
    expect(builder.status(STATUS).response().status).toEqual(STATUS);
  });
  
  it('status() method should update the "status" property of the response object', () => {
    builder.status(STATUS);
    expect(builder.response().status).toEqual(STATUS);
    const anotherStatusCode: number = HttpStatusCode.Conflict;
    builder.status(anotherStatusCode);
    expect(builder.response().status).toEqual(anotherStatusCode);
  });
  
  it('url() method should set the "url" property of the response object', () => {
    expect(builder.url(URL).response().url).toEqual(URL);
  });
  
  it('url() method should update the "url" property of the response object', () => {
    builder.url(URL);
    expect(builder.response().url).toEqual(URL);
    const anotherUrl: string = "/another/url";
    builder.url(anotherUrl);
    expect(builder.response().url).toEqual(anotherUrl);
  });
  
  it('headers() method should set the "headers" property of the response object', () => {
    expect(builder.headers(HEADERS).response().headers).toEqual(HEADERS);
  });
  
  it('headers() method should update the "headers" property of the response object', () => {
    builder.headers(HEADERS);
    expect(builder.response().headers).toEqual(HEADERS);
    const anotherHeaderSet: HttpHeaders = new HttpHeaders('test');
    expect(anotherHeaderSet).not.toEqual(HEADERS);
    builder.headers(anotherHeaderSet);
    expect(builder.response().headers).toEqual(anotherHeaderSet);
  });
  
  it('delay() method should set the "delay" property of the response object', () => {
    expect(builder.delay(DELAY).response().delay).toEqual(DELAY);
  });
  
  it('delay() method should update the "delay" property of the response object', () => {
    builder.delay(DELAY);
    expect(builder.response().delay).toEqual(DELAY);
    const anotherDelay: number = 2000;
    builder.delay(anotherDelay);
    expect(builder.response().delay).toEqual(anotherDelay);
  });

  it('delay() method should create a random value by default', () => {
    builder.delay();
    const delay = builder.response().delay;
    expect(typeof delay).toEqual(NUMBER);
  });

  it('delay() method should create a random value greater than, or equal to 0', () => {
    builder.delay();
    expect(builder.response().delay).toBeGreaterThanOrEqual(0);
  });

  it('delay() method should create a random value lower than, or equal to HTTP_MOCK_MAX_DELAY', () => {
    builder.delay();
    expect(builder.response().delay).toBeLessThanOrEqual(HTTP_MOCK_MAX_DELAY);
  });
  
  it('delay() method should create a value equal to 0 when timer is lower than 0', () => {
    builder.delay(-5);
    expect(builder.response().delay).toEqual(0);
  });
  
  it('delay() method should create a value equal to HTTP_MOCK_MAX_DELAY when timer is greater than HTTP_MOCK_MAX_DELAY', () => {
    builder.delay(HTTP_MOCK_MAX_DELAY + 10);
    expect(builder.response().delay).toEqual(HTTP_MOCK_MAX_DELAY);
  });
  
  it('delay(min, max) method should create a random value between min and max', () => {
    const min = 10;
    const max = 1000;
    builder.delay(min, max);
    const delay = builder.response().delay;
    expect(delay).toBeGreaterThanOrEqual(min);
    expect(delay).toBeLessThanOrEqual(max);
  });

  it('delay(min, max) method should create a random value between min and max even if min is lower than 0 and max is greater than HTTP_MOCK_MAX_DELAY', () => {
    const min = -10;
    const max = HTTP_MOCK_MAX_DELAY + 10;
    builder.delay(min, max);
    const delay = builder.response().delay;
    expect(delay).toBeGreaterThanOrEqual(0);
    expect(delay).toBeLessThanOrEqual(HTTP_MOCK_MAX_DELAY);
  });
  
  it('statusText should be set depending on the specified status', () => {
    builder.status(STATUS);
    expect(builder.response().statusText).toEqual(HttpStatusText.ACCEPTED);
    const anotherStatusCode: number = HttpStatusCode.Conflict;
    builder.status(anotherStatusCode);
    expect(builder.response().statusText).toEqual(HttpStatusText.CONFLICT);
  });
});
