/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * @private
 */
const NAME: string = "IntegrityError";

/**
 * Represents a data integrity violation error.
 */
export class IntegrityError extends Error {

    /**
     * Creates en new `IntegrityError` instances.
     * 
     * @param message A human-readable description of the error.
     */
    constructor(message: string) {
        super(message);
        this.name = NAME;
    }
}