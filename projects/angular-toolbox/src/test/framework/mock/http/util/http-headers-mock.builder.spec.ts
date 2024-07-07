/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeadersMockBuilder } from '../../../../../public-api';
import { HttpHeaders } from '@angular/common/http';

describe('HttpResponseMockBuilder', () => {

  let builder: HttpHeadersMockBuilder;

  beforeEach(() => {
    builder = new HttpHeadersMockBuilder();
  });
  
  it('should create an instance', () => {
    expect(builder).toBeTruthy();
  });
  
  it('headers() method should return a new object', () => {
    expect(builder.headers()).toBeTruthy();
  });

  it('headers() method should create a HttpHeaders instance with no entries', () => {
    const headers: any = builder.headers();
    expect(headers.keys().length).toEqual(0);
  });
  
  it('setHeader() should add the specified header to the new HttpHeaders instance', () => {
    const headers: any = builder.set("name", "value").headers();
    expect(headers.get("name")).toEqual("value");
  });
  
  it('setHeader() second parameter should accpet arry of strings', () => {
    const headers: any = builder.set("name", ["value-1", "value-2"]).headers();
    expect(headers.get("name")).toEqual("value-1, value-2");
  });
  
  it('setHeader() should return the reference to the builder instance', () => {
    expect(builder.set("name", "value")).toEqual(builder);
  });
  
  it('acceptEncoding() should add the "Accept-Encoding" header with "gzip, deflate, br, zstd" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.acceptEncoding().headers();
    expect(headers.get("Accept-Encoding")).toEqual("gzip, deflate, br, zstd");
  });
  
  it('acceptEncoding() should add the "Accept-Encoding" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.acceptEncoding("gzip").headers();
    expect(headers.get("Accept-Encoding")).toEqual("gzip");
  });
  
  it('acceptEncoding() should return the reference to the builder instance', () => {
    expect(builder.acceptEncoding()).toEqual(builder);
  });
  
  it('accept() should add the "Accept" header with "*/*" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.accept().headers();
    expect(headers.get("Accept")).toEqual("*/*");
  });
  
  it('accept() should add the "Accept" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.accept("application/json").headers();
    expect(headers.get("Accept")).toEqual("application/json");
  });
  
  it('accept() should return the reference to the builder instance', () => {
    expect(builder.accept()).toEqual(builder);
  });
  
  it('acceptLanguage() should add the "Accept-Language" header with the brwoser language as" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.acceptLanguage().headers();
    expect(headers.get("Accept-Language")).toEqual(navigator.language);
  });
  
  it('acceptLanguage() should add the "Accept-Language" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.acceptLanguage("en-US").headers();
    expect(headers.get("Accept-Language")).toEqual("en-US");
  });
  
  it('acceptLanguage() should return the reference to the builder instance', () => {
    expect(builder.acceptLanguage()).toEqual(builder);
  });
  
  it('userAgent() should add the "User-Agent" header with the brwoser language as" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.userAgent().headers();
    expect(headers.get("User-Agent")).toEqual(navigator.userAgent);
  });
  
  it('userAgent() should add the "User-Agent" header with the specified value to the new HttpHeaders instance', () => {
    const userAgent: string = "Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion";
    const headers: any = builder.userAgent(userAgent).headers();
    expect(headers.get("User-Agent")).toEqual(userAgent);
  });
  
  it('userAgent() should return the reference to the builder instance', () => {
    expect(builder.userAgent()).toEqual(builder);
  });
  
  it('priority() should add the "Priority" header with "u=0, i" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.priority().headers();
    expect(headers.get("Priority")).toEqual("u=0, i");
  });
  
  it('priority() should add the "Priority" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.priority("q=0.9").headers();
    expect(headers.get("Priority")).toEqual("q=0.9");
  });
  
  it('priority() should return the reference to the builder instance', () => {
    expect(builder.priority()).toEqual(builder);
  });
  
  it('contentType() should add the "Content-Type" header with "application/json; charset=utf-8" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.contentType().headers();
    expect(headers.get("Content-Type")).toEqual("application/json; charset=utf-8");
  });
  
  it('contentType() should add the "Content-Type" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.contentType("application/pdf").headers();
    expect(headers.get("Content-Type")).toEqual("application/pdf");
  });
  
  it('contentType() should return the reference to the builder instance', () => {
    expect(builder.contentType()).toEqual(builder);
  });
  
  it('cacheControl() should add the "Cache-Control" header with "no-cache" default value to the new HttpHeaders instance', () => {
    const headers: any = builder.cacheControl().headers();
    expect(headers.get("Cache-Control")).toEqual("no-cache");
  });
  
  it('cacheControl() should add the "Cache-Control" header with the specified value to the new HttpHeaders instance', () => {
    const headers: any = builder.cacheControl("max-age=600").headers();
    expect(headers.get("Cache-Control")).toEqual("max-age=600");
  });
  
  it('cacheControl() should return the reference to the builder instance', () => {
    expect(builder.cacheControl()).toEqual(builder);
  });
});
