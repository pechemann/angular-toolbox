/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { EMPTY_STRING, LogBuilder, LogLevel, Uuid } from "projects/angular-toolbox/src/public-api";

export const URL_STRING: string = "http://fake-url.com";
export const URL_OBJ: URL = new URL(URL_STRING);
export const DATA: any = { foo: "bar" };
export const STRING_DATA: string = '{ "foo": "bar" }';

export const buildRequestMetadata = ()=> {
  return {
    duration: 964,
    stalled: 500,
    start: 60,
    url: URL_OBJ,
    id: Uuid.build()
  };
}

export const buildHttpMockLoggingMetadata = ()=> {
    return {
        request: new HttpRequest("GET", URL_STRING),
        response: new HttpResponse(),
        requestMetadata: buildRequestMetadata()
    }
};

export const buildLog = ()=> {
  const metadata = {
    request: new HttpRequest("GET", URL_STRING),
    response: new HttpResponse(),
    requestMetadata: buildRequestMetadata()
  };
  return LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
}