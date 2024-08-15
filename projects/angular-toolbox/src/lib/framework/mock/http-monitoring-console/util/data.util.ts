/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BOOLEAN, NUMBER, STRING } from '../../../../util';
import { AtxConsoleJsonProp } from '../model/business/atx-console-json-prop';
import { ConsoleType } from './console-type';

const NULL: string = "null";
const ARR_END: string = '...]';
const OBJ_END: string = '...}'

export class DataUtil {

    public static parseJson(obj: any, label?: string): AtxConsoleJsonProp {
        const primitive: string = typeof obj;
        let type: ConsoleType = ConsoleType.OBJECT,
            value: any = obj,
            children: any = null;
        if (primitive === STRING) type = ConsoleType.STRING;
        else if (primitive === NUMBER) type = ConsoleType.NUMBER;
        else if (primitive === BOOLEAN) type = ConsoleType.BOOLEAN;
        else if (Array.isArray(obj)) {
            const rawValue: string = JSON.stringify(obj);
            let len: number = obj.length - 1;
            let idx: number = 0;
            type = ConsoleType.ARRAY;
            value = rawValue.length > 50 ? rawValue.substring(0, 46) + ARR_END : rawValue;
            children = [];
            for (; len >= 0; len--) {
                children.push(DataUtil.parseJson(obj[len], String(idx)));
                idx++;
            }
        } else if (obj === null) {
            type = ConsoleType.NULL;
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
            type: type,
            value: value,
            children: children
          }
    }
    
}
