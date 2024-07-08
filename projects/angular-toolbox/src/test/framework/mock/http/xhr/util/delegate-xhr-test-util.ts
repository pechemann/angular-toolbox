/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { RouteMockConfig } from 'projects/angular-toolbox/src/lib/framework/mock/http/config/route-mock-config';
import { HttpHeadersUtil } from 'projects/angular-toolbox/src/lib/framework/mock/http/util/http-headers.util';
import { HttpMockError, httpResponseMock } from 'projects/angular-toolbox/src/public-api';

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
    parameters: { id: "10" }
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
    parameters: { id: "10" }
};