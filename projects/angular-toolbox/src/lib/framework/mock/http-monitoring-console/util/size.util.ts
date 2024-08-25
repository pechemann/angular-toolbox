/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 */
const B: string = " B";

/**
 * @private
 */
const KB: string = " KB";

/**
 * @private
 */
const MB: string = " MB";

/**
 * @private
 * A utility class for managing request data size.
 */
export class SizeUtil {

    /**
     * The string reference to the initial data size.
     */
    public static readonly INITIAL_SIZE: string = "0 B";

    /**
     * @private
     * Returns the size of the specified object in bytes.
     * 
     * @param obj The object for which to get the size.
     * @returns The size of the specified object.
     */
    public static getSize(obj: any): number {
        if (!obj) return 0;
        return new TextEncoder().encode(JSON.stringify(obj)).length;
    }
    
    /**
     * @private
     * 
     * Returns the string representation of the specified size.
     * @param size The size, in bytes, for which to get the string representation.
     * @returns The string representation of the specified size.
     */
    public static sizeToString(size: number): string {
        if (size < 1024) return size + B;
        size = size / 1024;
        if (size < 1024) return size.toFixed(2) + KB;
        return (size / 1024).toFixed(2) + MB;
    }
}