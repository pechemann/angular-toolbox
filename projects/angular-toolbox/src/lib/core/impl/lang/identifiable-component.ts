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
    private readonly _classRef: string;

    /**
     * @private
     */
    private readonly _uuid: Uuid = Uuid.build();

    /**
     * A string that represent the class reference for this object.
     * This can be useful to workaround TypeScript compilation obfuscation.
     * 
     * @param classRef The class reference for this object.
     */
    constructor(classRef: string | undefined = undefined) {
        this._classRef = classRef || this.constructor.name;
    }

    /**
     * Returns the unique identifier for this object.
     * 
     * @returns An instance of the `Uuid` class.
     */
    public getID(): Uuid {
        return this._uuid;
    }
    
    /**
     * Returns the class name reference of this object. Can be either the `classRef`
     * paramter of the contructor method, or the constructor `name` property value.
     * 
     * @returns the class name reference of this object.
     */
    public getClassRef(): string {
        return this._classRef;
    }
};