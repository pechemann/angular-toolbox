/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * A utility class that unserialize the `FormData` objects.
 */
export class FormDataSerializer {

    /**
     * @private
     * Unserializes the specified `FormData` objects.
     * 
     * @param data The string to turn into a `FormData` object.
     * @returns A `FormData` object, or null whether the `data` string is not a Array string.
     */
    public static unserialize(data: string): FormData | null {
        const result: FormData = new FormData();
        const arr: any[] = JSON.parse(data);
        if (!Array.isArray(arr)) return null;
        let cursor: number = arr.length - 1;
        for(; cursor >= 0; cursor--) {
            const entry: string[] = arr[cursor];
            result.append(entry[0], entry[1]);
        }
        return result;
    }
}
