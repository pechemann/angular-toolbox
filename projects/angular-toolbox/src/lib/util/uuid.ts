/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { EMPTY_STRING } from "./empty-string.const";
import { IntegrityError } from "../core/error";

/**
 * @private
 * The regexp used to validate UUID strings.
 */
const VALIDATOR: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * A class that represents an immutable universally unique identifier (UUID).
 * This class is not available in workers. 
 */
export class Uuid {

    /**
     * @private
     * Stores a reference to the UUID associated with this `Uuid` instance.
     */
    private readonly _uuid: string;

    /**
     * @private
     * Stores a boolean value used to lock constructor access.
     */
    private static _lockConstructor: boolean = true;

    /**
     * @private
     * Stores a reference to all UUIDs already created.
     */
    private static _hash: string = EMPTY_STRING;

    /**
     * @private
     * Created a new `Uuid` instance.
     *
     * @param uuid A string used that represents the UUID associated with this `Uuid` instance.
     *             If `null` creates a random UUID value. 
     */
    private constructor(uuid: string | null) {
        if (Uuid._lockConstructor) throw new ReferenceError("Uuid class has private constructor.")
        this._uuid = uuid || crypto.randomUUID();
        Uuid._hash += `${uuid}|`;
        Uuid._lockConstructor = true;
    }

    /**
     * Returns a string that represents the UUID value associated with this `Uuid` instance.
     * 
     * @returns The UUID string value associated with this `Uuid` instance.
     */
    public toString(): string {
        return this._uuid;
    }

    /**
     * Creates and returns a new `Uuid` instance.
     * 
     * @returns A new `Uuid` instance.
     */
    public static build(): Uuid {
        Uuid._lockConstructor = false;
        return new Uuid(null);
    }
    
    /**
     * Creates and returns a new `Uuid` instance built from the specified `uuid` parameter.
     * 
     * @param uuid The UUID string value used to create the new `Uuid` instance.
     * 
     * @returns A new `Uuid` instance built from the specified `uuid` parameter.
     */
    public static fromString(uuid: string): Uuid {
        if(Uuid._hash.includes(uuid)) throw new IntegrityError("Data Integrity Violation. UUID already exists: " + uuid);
        if (!Uuid.validate(uuid)) throw new TypeError("Invalid UUID value: " + uuid);
        Uuid._lockConstructor = false;
        return new Uuid(uuid);
    }

    /**
     * Performs validation on the specified `uuid` string parameter.
     * 
     * @param uuid A UUID representation string to validate.
     * @returns `true` whether the `uuid` string parameter is valid; `false` otherwise.
     */
    public static validate(uuid: string): boolean {
        return VALIDATOR.test(uuid);
    }
}