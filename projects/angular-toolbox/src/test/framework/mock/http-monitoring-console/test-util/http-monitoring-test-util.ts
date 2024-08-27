/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Uuid } from "projects/angular-toolbox/src/public-api";

export const URL_STRING: string = "http://fake-url.com";
export const URL_OBJ: URL = new URL(URL_STRING);
export const DATA: any = { foo: "bar" };
export const STRING_DATA: string = '{ "foo": "bar" }';

export const buildHttpMockLoggingMetadata = ()=> {
    return {
        request: new HttpRequest("GET", URL_STRING),
        response: new HttpResponse(),
        requestMetadata: {
            duration: 260,
            stalled: 964,
            start: 695,
            url: URL_OBJ,
            id: Uuid.build()
        }
    }
};