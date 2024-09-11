/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Version } from "../model";
import { EMPTY_STRING } from "./empty-string.const";

/**
 * @private
 */
const DASH: string = "-";

/**
 * A convenient utility class for working with `Version` objects.
 */
export class VersionUtil {

    /**
     * Returns a string that represents the specified `Version` object.
     * 
     * @param version The `Version` object for which to get a string representation.
     * 
     * @returns A string that represents the specified `Version` object.
     */
    public static stringify(version: Version): string {
        const m: string | undefined = version.metadata;
        return `${version.major}.${version.minor}.${version.patch}${m ? DASH + m : EMPTY_STRING}`;
    }
    
    /**
     * Compares the given `Version` objects.
     * 
     * @param v1 The first object to compare.
     * @param v2 The second object to compare.
     * 
     * @returns `true` whether both `Version` objects are equal; `false` otherwise.
     */
    public static equal(v1: Version, v2: Version): boolean {
        return  v1.major === v2.major &&
                v1.minor === v2.minor &&
                v1.patch === v2.patch &&
                v1.buildTimeStamp === v2.buildTimeStamp &&
                v1.metadata === v2.metadata;
    }
}