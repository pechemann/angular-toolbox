/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
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
}