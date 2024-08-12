/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders } from "@angular/common/http";
import { HttpHeadersUtil } from "projects/angular-toolbox/src/lib/framework/mock/http/util/http-headers.util";
import { EMPTY_STRING } from "projects/angular-toolbox/src/public-api";

describe('HttpHeadersUtil', () => {
  
  it('createDefaultRequestHeaders() should return an instance of HttpHeaders', () => {
    expect(HttpHeadersUtil.createDefaultRequestHeaders()).toBeInstanceOf(HttpHeaders);
  });

  it('createDefaultRequestHeaders() should return an instance of HttpHeaders with "Cache-Control" set to "no-cache"', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    expect(headers.get("Cache-Control")).toEqual("no-cache");
  });

  it('createDefaultRequestHeaders() should return an instance of HttpHeaders with "Accept-Encoding" set to "gzip, deflate, br, zstd"', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    expect(headers.get("Accept-Encoding")).toEqual("gzip, deflate, br, zstd");
  });

  it('createDefaultRequestHeaders() should return an instance of HttpHeaders with "Accept-Language" set to the browser language value', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    expect(headers.get("Accept-Language")).toEqual(navigator.language);
  });

  it('createDefaultRequestHeaders() should return an instance of HttpHeaders with "Priority" set to "u=0, i"', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    expect(headers.get("Priority")).toEqual("u=0, i");
  });

  it('createDefaultRequestHeaders() should return an instance of HttpHeaders with "User-Agent" set to the browser userAgent value', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    expect(headers.get("User-Agent")).toEqual(navigator.userAgent);
  });
  
  it('stringify() should return an empty string whether the httpHeader property is undefined', () => {
    expect(HttpHeadersUtil.stringify(undefined)).toEqual(EMPTY_STRING);
  });
  
  it('stringify() should return well formated string for the specified header', () => {
    const headers: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
    const expected: string = `Cache-Control: no-cache\r\nAccept-Encoding: gzip, deflate, br, zstd\r\nAccept-Language: ${navigator.language}\r\nPriority: u=0, i\r\nUser-Agent: ${navigator.userAgent}`;
    expect(HttpHeadersUtil.stringify(headers)).toEqual(expected);
  });
  
  it('encode() should return null when the string parameter is null', () => {
    expect(HttpHeadersUtil.encode(null)).toBeNull();
  });
  
  it('encode() should return a HttpHeaders object with the specified values', () => {
    const src: string = `Cache-Control: no-cache\r\nAccept-Encoding: gzip, deflate, br, zstd\r\nAccept-Language: ${navigator.language}\r\nPriority: u=0, i\r\nUser-Agent: ${navigator.userAgent}`;
    const headers = HttpHeadersUtil.encode(src);
    headers?.keys().forEach(key=> {
      const value = headers.get(key) as any;
      expect(src.includes(key)).toBeTrue();
      expect(src.includes(value)).toBeTrue();
    })
  });
});
