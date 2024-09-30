/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Provides the API to create documentation for a specific HTTP method.
 */
export interface HttpMockEMethodDescriptor {
    
    /**
     * The description of the method associated with this descriptor.
     */
    description?: string;

    /**
     * The payload description for the method associated with this descriptor.
     */
    payload?: string;

    /**
     * The body description for the method associated with this descriptor.
     */
    body?: string;
}
