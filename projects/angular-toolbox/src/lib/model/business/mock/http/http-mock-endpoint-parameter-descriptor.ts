/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Provides the API to create documentation for a specific endpoint parameter.
 */
export interface HttpMockEndpointParameterDescriptor {
    
    /**
     * The description of the endpoint parameter associated with this descriptor.
     */
    description: string;

    /**
     * The referrence to the parameter associated with this descriptor.
     */
    ref: string;
}
