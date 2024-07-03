/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EMPTY_STRING } from "./empty-string.const";
import { IntegrityError } from "../core/error";
import { Destroyable } from "../model";

/**
 * @private
 * The regexp used to validate UUID strings.
 */
const VALIDATOR: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * A class that represents an immutable universally unique identifier (UUID).
 * This class is not available in workers. 
 */
export class Uuid implements Destroyable {

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
     * @param tracked If `true`, stores the UUID reference in the system.
     */
    private constructor(uuid: string | null, tracked: boolean) {
        if (Uuid._lockConstructor) throw new ReferenceError("Uuid class has private constructor.");
        const UUID: string = uuid || crypto.randomUUID();
        this._uuid = UUID;
        if (tracked) Uuid._hash += `${UUID}|`;
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
     * @param track If `true`, stores the UUID reference in the system.
     * 
     * @returns A new `Uuid` instance.
     */
    public static build(track: boolean = false): Uuid {
        Uuid._lockConstructor = false;
        return new Uuid(null, track);
    }
    
    /**
     * Creates and returns a new `Uuid` instance built from the specified `uuid` parameter.
     * 
     * @param uuid The UUID string value used to create the new `Uuid` instance.
     * @param track If `true`, performs a validation process to ensure that the UUID string does not exists in the system.
     * 
     * @returns A new `Uuid` instance built from the specified `uuid` parameter.
     */
    public static fromString(uuid: string, track: boolean = false): Uuid {
        if(track) {
            if(!this.isTracked(uuid)) throw new IntegrityError("Data Integrity Violation. UUID already exists: " + uuid);
        }
        if (!Uuid.validate(uuid)) throw new TypeError("Invalid UUID value: " + uuid);
        Uuid._lockConstructor = false;
        return new Uuid(uuid, track);
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

    /**
     * Performs a test to ensure that the UUID string is not tracked the system.
     * 
     * @param uuid A UUID representation string to test.
     * @returns `true` whether the `uuid` string parameter is tracked; `false` otherwise.
     */
    public static isTracked(uuid: string): boolean {
        return !Uuid._hash.includes(uuid);
    }
    
    /**
     * Releases the `Uuid` instance from the tracking system and makes it elligible for garbage collection.
     * 
     * @returns `true` whether the `Uuid` instance was found and removed; `false` otherwise. 
     */
    public destroy(): boolean {
        const ref: string =this._uuid;
        if (!Uuid.isTracked(ref)) {
            Uuid._hash = Uuid._hash.replace(ref, EMPTY_STRING);
            return true;
        }
        return false;
    }
}