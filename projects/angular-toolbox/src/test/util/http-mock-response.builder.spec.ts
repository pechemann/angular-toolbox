import { TestBed } from '@angular/core/testing';
import { HttpResponseMockBuilder, HttpResponseMock } from '../../public-api';
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';

const BODY: string = 'Body test';
const STATUS: number = HttpStatusCode.Accepted;
const STATUS_TEXT: string = 'Status text test';
const URL: string = '/test/url';
const HEADERS: HttpHeaders = new HttpHeaders();
const BODY_OBJ: any = { data: 'Body test' };

describe('HttpResponseMockBuilder', () => {

  let builder: HttpResponseMockBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    builder = new HttpResponseMockBuilder();
  });
  
  it('should create an instance', () => {
    expect(builder).toBeTruthy();
  });
  
  it('response() method should return a new object', () => {
    expect(builder.response()).toBeTruthy();
  });

  it('response() method should create empty HttpResponseMock objects, except "url" property set to "null"', () => {
    const response: HttpResponseMock = builder.response();
    expect(response.body).toBeUndefined();
    expect(response.headers).toBeUndefined();
    expect(response.status).toBeUndefined();
    expect(response.statusText).toBeUndefined();
    expect(response.url).toBeNull();
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

  it('statusText() method should set the "statusText" property of the response object', () => {
    expect(builder.statusText(STATUS_TEXT).response().statusText).toEqual(STATUS_TEXT);
  });
  
  it('statusText() method should update the "statusText" property of the response object', () => {
    builder.statusText(STATUS_TEXT);
    expect(builder.response().statusText).toEqual(STATUS_TEXT);
    const anotherStatusText: string = "Lorem Ipsum";
    builder.statusText(anotherStatusText);
    expect(builder.response().statusText).toEqual(anotherStatusText);
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
});
