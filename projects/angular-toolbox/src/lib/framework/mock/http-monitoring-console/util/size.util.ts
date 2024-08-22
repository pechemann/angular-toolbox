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

export class SizeUtil {

    public static getSize(obj: any): number {
        if (!obj) return 0;
        return new TextEncoder().encode(JSON.stringify(obj)).length;
    }
    
    public static sizeToString(size: number): string {
        if (size < 1024) return size + B;
        size = size / 1024;
        if (size < 1024) return size.toFixed(2) + KB;
        return (size / 1024).toFixed(2) + MB;
    }
}