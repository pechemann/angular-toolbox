/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from "@angular/common/http";
import { HttpResponseMock } from "./http-response-mock";
import { HttpMockParameters } from "../../../../framework";
import { HttpMockEMethodDescriptor } from "./http-mock-method-descriptor";

/**
 * The `HttpMethodMock` interface defines the behavior of actions invoked each time an Angular
 * `HttpClient` instance sends requests to a specific API endpoint.
 */
export interface HttpMethodMock {

    /**
     * @private
     * Current progressive download mechanism will be replaced by a more efficient process.
     */
    downloadManager?: any;
    
    /**
     * This method emulates a successful HTTP call response.
     * 
     * @param request The request associated with a HTTP call.
     * @param parameters The list of parameters associated with the HTTP request.
     * 
     * @returns A user-defined `HttpResponse` mock object.
     */
    data: (request: HttpRequest<any>, parameters?: HttpMockParameters)=> HttpResponseMock;
    
    /**
     * The API descriptor of the associated with this HTTP method.
     */
    descriptor?: HttpMockEMethodDescriptor;
}
