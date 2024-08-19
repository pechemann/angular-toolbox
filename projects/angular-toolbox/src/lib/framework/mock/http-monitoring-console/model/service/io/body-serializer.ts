/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "../../../util/console-body-type";

export class BodySerializer {

    public static serialize(data: any, type: ConsoleBodyType): string | null {
        if (type === ConsoleBodyType.TEXT) return data;
        if (type === ConsoleBodyType.JSON) return JSON.stringify(data);
        if (type === ConsoleBodyType.BLOB) return null;
        if (type === ConsoleBodyType.FORM_DATA) return JSON.stringify(Array.from(data));
        if (type === ConsoleBodyType.ARRAY_BUFFER) null;
        return null;
    }
    
    public static unserialize(data: any, type: ConsoleBodyType): any {
        if (type === ConsoleBodyType.TEXT) return data;
        if (type === ConsoleBodyType.JSON) return JSON.parse(data);
        if (type === ConsoleBodyType.BLOB) return null;
        if (type === ConsoleBodyType.FORM_DATA) return BodySerializer.stringToFormData(data);
        if (type === ConsoleBodyType.ARRAY_BUFFER) null;
        return null;
    }

    private static stringToFormData(data: string): FormData {
        const result: FormData = new FormData();
        const arr: any[] = JSON.parse(data);
        let cursor: number = arr.length - 1;
        for(; cursor >= 0; cursor--) {
            const entry: string[] = arr[cursor];
            result.append(entry[0], entry[1]);
        }
        return result;
    }
}
