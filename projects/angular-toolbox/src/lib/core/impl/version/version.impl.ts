/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Version } from "../../../model";
import { EMPTY_STRING } from "../../../util";

/**
 * @private
 * Specifies the semantic versioning of an API.
 */
export class VersionImpl implements Version {

    /**
     * Specifies versions with incompatible API changes.
     */
    public readonly major: number;

    /**
     * Specifies versions with functionalities that have  backward compatibility.
     */
    public readonly minor: number;

    /**
     * Specifies versions that fixes bugs.
     */
    public readonly patch: number;
    
    /**
     * Specifies the timestamp that corresponds to the build date for this `Version` instance.
     */
    public readonly buildTimeStamp: number;
    
    /**
     * An optional string that indicates additional labels for pre-release and build metadata.
     */
    public readonly metadata: string | undefined;

    /**
     * @private
     */
    constructor(major: number, minor: number, patch: number, buildTimeStamp: number, metadata?: string) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.buildTimeStamp = buildTimeStamp;
        this.metadata = metadata;
    }

    /**
     * Returns a string representation of this `Version` object in the form `M.m.p`, where
     * `M` represents the major number, `m` represents the minor number and `p` represents
     * the patch number of this `VersionImpl` instance.
     * 
     * @returns A string representation of this `VersionImpl` instance.
     */
    public toString(): string {
        const m: string | undefined = this.metadata;
        return `${this.major}.${this.minor}.${this.patch}${m ? "-" + m : EMPTY_STRING}`;
    }
};