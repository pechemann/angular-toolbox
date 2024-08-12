/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Uuid } from "../../../util";

/**
 * `Identifiable` objects are Angular components that can be identified by a unique UUID identifier.
 */
export interface Identifiable {

    /**
     * Returns the unique identifier for this object.
     * 
     * @returns An instance of the `Uuid` class.
     */
    getID(): Uuid;
    
    /**
     * Returns the class name reference of this object.
     * This can be useful to workaround TypeScript compilation obfuscation.
     * 
     * @returns the class name reference of this object.
     */
    getClassRef(): string
}