/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { RouteMockConfig } from 'projects/angular-toolbox/src/lib/framework/mock/http/config/route-mock-config';
import { HttpHeadersUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-headers.util';
import { HttpMockConfig, HttpMockError, httpResponseMock, Uuid } from 'projects/angular-toolbox/src/public-api';
import { of, throwError } from 'rxjs';

class UrlSearchParamsMock extends Map<any, any> implements URLSearchParams {
  constructor(map?: Map<string,any>) {
    super(map);
  }
  append(): void {}
  getAll(): any[] { return [] }
  sort(): void {}
  override forEach(): void {}
}

export const buildUrlSearchParamsMock = (...data: any): URLSearchParams=> {
  let instance: URLSearchParams;
  const len = data.length;
  if (len) {
    const map: Map<string, string> = new Map();
    let i: number = 0;
    for (; i <= data.length - 1; ++i) {
      const pair = data[i];
      map.set(pair[0], pair[1]);
    }
    instance = new UrlSearchParamsMock(map);
  } else instance = new UrlSearchParamsMock();
  return instance;
};

export const BODY: string = "Hello world!";
export const BODY_SIZE = new Blob([JSON.stringify(BODY)]).size;
export const I_M_A_TEA_POT: string = "I'm a teapot";
export const URL: string = "http://www.foo-bar.com/api/users/10";
export const HTTP_HEADERS: HttpHeaders = HttpHeadersUtil.createDefaultRequestHeaders();
export const HTTP_STATUS: HttpStatusCode = HttpStatusCode.ImATeapot;
export const ROUTE_CONFIG: RouteMockConfig = {
    methodConfig: {
        responseType: "document",
        data: () => httpResponseMock().status(HTTP_STATUS)
                                      .statusText(I_M_A_TEA_POT)
                                      .url(URL)
                                      .headers(HTTP_HEADERS)
                                      .body(BODY).response()
    },
    parameters: { id: "10" },
    searchParams: buildUrlSearchParamsMock()
};

export const ERROR: HttpMockError = {
    status: HttpStatusCode.BadRequest,
    statusText: "Bad request"
};

export const ROUTE_CONFIG_WITH_ERROR: RouteMockConfig = {
    methodConfig: {
        responseType: "document",
        data: () => httpResponseMock().status(HTTP_STATUS)
                                      .statusText(I_M_A_TEA_POT)
                                      .url(URL)
                                      .headers(HTTP_HEADERS)
                                      .body(BODY).response(ERROR)
    },
    parameters: { id: "10" },
    searchParams: buildUrlSearchParamsMock()
};

export const FOO_MOCK_CONFIG: HttpMockConfig = {
  id: Uuid.build(),
  origin: "http://www.foo-bar.com",
  interceptors: [
    {
      id: "users",
      endpoints: [
        {
          route: "/api/users/:id",
          get: {
            data: () => httpResponseMock().body(BODY).response()
          }
        }
      ]
    }
  ]
};

export const OBSERVABLE_MOCK_CONFIG: RouteMockConfig = {
  methodConfig: {
      responseType: "text",
      data: () => httpResponseMock().status(HTTP_STATUS)
                                    .statusText(I_M_A_TEA_POT)
                                    .url(URL)
                                    .headers(HTTP_HEADERS)
                                    .body(of(BODY)).response()
  },
  parameters: {},
  searchParams: buildUrlSearchParamsMock()
};

export const HTTP_ERROR = new HttpErrorResponse({ error: "HTTP Error", status: 500, statusText: "Internal Server Error" });

export const OBSERVABLE_ERROR_CONFIG: RouteMockConfig = {
  methodConfig: {
      responseType: "text",
      data: () => httpResponseMock().body(throwError(() => HTTP_ERROR)).response()
  },
  parameters: {},
  searchParams: buildUrlSearchParamsMock()
};