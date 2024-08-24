/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BOOLEAN, NUMBER, OBJECT, STRING } from '../../../../util';
import { AtxConsoleJson } from '../model/business/atx-console-json';
import { ConsoleBodyType } from './console-body-type';
import { ConsoleTypeClass } from './console-type-class';

const NULL: string = "null";
const ARR_END: string = '...]';
const OBJ_END: string = '...}'

/**
 * @private
 * A utility class for managing metadata objects.
 */
export class DataUtil {

    /**
     * @private
     * Parses the specified object and returns a `AtxConsoleJson` tree that represents
     * the structure of parsed object.
     * 
     * @param obj The object to parse.
     * @param label An optional `label` used to set the label property of the `AtxConsoleJson` object.
     * @returns a `AtxConsoleJson` tree object.
     */
    public static parseJson(obj: any, label?: string): AtxConsoleJson {
        const primitive: string = typeof obj;
        let type: ConsoleTypeClass = ConsoleTypeClass.OBJECT,
            value: any = obj,
            children: any = null;
        if (primitive === STRING) type = ConsoleTypeClass.STRING;
        else if (primitive === NUMBER) type = ConsoleTypeClass.NUMBER;
        else if (primitive === BOOLEAN) type = ConsoleTypeClass.BOOLEAN;
        else if (Array.isArray(obj)) {
            const rawValue: string = JSON.stringify(obj);
            let len: number = obj.length - 1;
            let idx: number = 0;
            type = ConsoleTypeClass.ARRAY;
            value = rawValue.length > 50 ? rawValue.substring(0, 46) + ARR_END : rawValue;
            children = [];
            for (; len >= 0; len--) {
                children.push(DataUtil.parseJson(obj[len], String(idx)));
                idx++;
            }
        } else if (obj === null) {
            type = ConsoleTypeClass.NULL;
            value = NULL;
        }
        else {
            const keys: string[] = Object.keys(obj);
            const rawValue: string = JSON.stringify(obj);
            let len: number = keys.length - 1;
            children = [];
            for (; len >= 0; len--) {
                const key: string = keys[len];
                children.push(DataUtil.parseJson(obj[key], key));
            }
            value = rawValue.length > 50 ? rawValue.substring(0, 46) + OBJ_END : rawValue;
        }
        return {
            label: label,
            typeClass: type,
            value: value,
            children: children
          }
    }
    
    /**
     * @private
     * Returns a constant of the ConsoleBodyType enum, depending on the type of the specified object.
     * 
     * @param obj The object for wich to get the type.
     * @returns A constant of the ConsoleBodyType enum.
     */
    public static getBodyType(obj: any): ConsoleBodyType {
        const primitive: string = typeof obj;
        if (obj === null || obj === undefined) return ConsoleBodyType.NULL;
        if (primitive === STRING) return ConsoleBodyType.TEXT;
        if (obj instanceof Blob) return ConsoleBodyType.BLOB;
        if (obj instanceof FormData) return ConsoleBodyType.FORM_DATA;
        if (obj instanceof ArrayBuffer) return ConsoleBodyType.ARRAY_BUFFER;
        if (Array.isArray(obj)) return ConsoleBodyType.ARRAY;
        if (primitive === OBJECT) return ConsoleBodyType.JSON;
        return ConsoleBodyType.INVALID;
    }
}
