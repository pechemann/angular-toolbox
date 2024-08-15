/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BOOLEAN, NUMBER, STRING } from '../../../../util';
import { AtxConsoleJsonProp } from '../model/business/atx-console-json-prop';

export class DataUtil {

    public static parseJson(obj: any, label?: string): AtxConsoleJsonProp {
        const primitive: string = typeof obj;
        let type: string = "atx-object",
            value: any = obj,
            children: any = null;
        if (primitive === STRING) type = "atx-string";
        else if (primitive === NUMBER) type = "atx-number";
        else if (primitive === BOOLEAN) type = "atx-boolean";
        else if (Array.isArray(obj)) {
            const rawValue: string = JSON.stringify(obj);
            let len: number = obj.length - 1;
            let idx: number = 0;
            type = "atx-array";
            value = rawValue.length > 50 ? rawValue.substring(0, 46) + '...]' : rawValue;
            children = [];
            for (; len >= 0; len--) {
                children.push(DataUtil.parseJson(obj[len], String(idx)));
                idx++;
            }
        } else if (obj === null) {
            type = "atx-null";
            value = "null";
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
            value = rawValue.length > 50 ? rawValue.substring(0, 46) + '...}' : rawValue;
        }
        return {
            label: label,
            type: type,
            value: value,
            children: children
          }
    }
    
}
