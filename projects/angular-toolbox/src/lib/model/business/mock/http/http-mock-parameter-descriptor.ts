/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Provides the API to create documentation for a specific HTTP parameter.
 */
export interface HttpParameterDescriptor {
    
    /**
     * The description of the HTTP parameter associated with this descriptor.
     */
    description: string;

    /**
     * The referrence to the HTTP associated with this descriptor.
     */
    ref: string;
}
