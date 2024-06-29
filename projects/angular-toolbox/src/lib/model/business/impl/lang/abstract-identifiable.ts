/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Uuid } from "projects/angular-toolbox/src/public-api";
import { Identifiable } from "../../lang";

/**
 * @private
 * The abstract class that must be extended by objects to be indentified by the 
 * Angulat Toolbox Subscription Service.
 */
export abstract class AbstractIdentifiable implements Identifiable {

    /**
     * @private
     */
    private readonly _uuid: Uuid;

    /**
     * @private
     */
    constructor() {
        this._uuid = Uuid.build();
    }

    /**
     * Returns the unique identifier for this object.
     * 
     * @returns An instance of the `Uuid` class.
     */
    public getID(): Uuid {
        return this._uuid;
    }
};