/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Identifiable } from "../../../model";
import { Uuid } from "../../../util";

/**
 * @private
 * The base class that must be extended by objects to be indentified by the 
 * Angular Toolbox Subscription Service.
 */
export class IdentifiableComponent implements Identifiable {

    /**
     * @private
     */
    private readonly _uuid: Uuid = Uuid.build();

    /**
     * Returns the unique identifier for this object.
     * 
     * @returns An instance of the `Uuid` class.
     */
    public getID(): Uuid {
        return this._uuid;
    }
};