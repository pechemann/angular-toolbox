/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at [TOOLBOXLICENSE]
 */

import { HttpMethodMock } from "../../../../model";
import { HttpMockParameters } from "./http-mock-parameters";

/**
 * @private
 * 
 * The markup interface for DTOs that are used to send a mock config to the delegate
 * `XhrProxy` instance.
 * This interface is not exposed.
 */
export interface RouteMockConfig {

    /**
     * @private
     * 
     * The `HttpMethodMock`object to be consumed by the the delegate `XhrProxy` instance.
     */
    methodConfig: HttpMethodMock;
    
    /**
     * @private
     * 
     * The list of URI parameters associated with the current HTTP call.
     */
    parameters: HttpMockParameters | null;
}