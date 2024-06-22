/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

/**
 * Specifies the semantic versioning of an Angular application.
 */
export interface Version {

    /**
     * Specifies versions with incompatible API changes.
     */
    major: number;
    
    /**
     * Specifies versions with functionalities that have  backward compatibility.
     */
    minor: number;

    /**
     * Specifies versions that fixes bugs.
     */
    patch: number;
    
    /**
     * Specifies the timestamp that corresponds to the build date for this `Version` object.
     */
    buildTimeStamp: number;

    /**
     * Returns a string representation of this `Version` object.
     * 
     * @returns A string representation of this `Version` object.
     */
    toString(): string;
};