/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpRequest } from "@angular/common/http";
import { HttpResponseMock } from "./http-response-mock";
import { HttpMockParameters } from "../../../../framework";

/**
 * The `HttpMethodMock` interface provides actions invoked each time an Angular
 * `HttpClient` instance sends requests to a specific API endpoint.
 */
export interface HttpMethodMock {

    /***
     * Indicates whether to emulate progressive download (`true`), or not (`false`) .
     */
    progressive?: boolean;
    
    /**
     * An enumerated string value specifying the type of data contained in the response.
     */
    responseType?: XMLHttpRequestResponseType;

    /**
     * This method emulates a successful HTTP call response.
     * 
     * @param request The request associated with a HTTP call.
     * @param parameters The rlist of parameters associated with the HTTP request.
     * 
     * @returns A user-defined `HttpResponse` mock object.
     */
    data?: (request: HttpRequest<any>, parameters?: HttpMockParameters)=> HttpResponseMock;
}
