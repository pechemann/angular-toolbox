/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpParameterDescriptor } from "./http-mock-parameter-descriptor";

/**
 * Provides the API to create documentation for a specific endpoint.
 */
export interface HttpMockEndpointDescriptor {
    
    /**
     * The description of the endpoint associated with this descriptor.
     */
    description?: string;

    /**
     * The description all parameters of the endpoint associated with this descriptor.
     */
    params?: HttpParameterDescriptor[];
}
