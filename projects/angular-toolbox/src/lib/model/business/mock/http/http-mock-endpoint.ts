/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMethodMock } from "./http-method-mock";

/**
 * Provides the API to define mocking strategies for a specific endpoint.
 */
export interface HttpMockEndpoint {
    
    /**
     * The route part of the endpoint to mock.
     */
    route: string;

    /**
     * The mock configuration of HTTP `GET` method calls for specified route.
     */
    get?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP `POST` method calls for specified route.
     */
    post?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP `PUT` method calls for specified route.
     */
    put?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP `DELETE` method calls for specified route.
     */
    delete?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP `PATCH` method calls for specified route.
     */
    patch?: HttpMethodMock;
    
    /**
     * The mock configuration of HTTP `HEAD` method calls for specified route.
     */
    head?: HttpMethodMock;
}
