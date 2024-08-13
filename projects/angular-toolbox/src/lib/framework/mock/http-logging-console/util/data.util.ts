/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { BOOLEAN } from 'angular-toolbox';
import { NUMBER, STRING } from '../../../../util';
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
        else if (Array.isArray(obj)) type = "atx-array";
        else if (obj === null) type = "atx-null";
        else {
            const keys: string[] = Object.keys(obj);
            let len: number = keys.length - 1;
            children = [];
            for (; len >= 0; len--) {
                const key: string = keys[len];
                children.push(DataUtil.parseJson(obj[key], key));
            }
            value = JSON.stringify(obj)
            console.log(keys)
        }
        console.log(obj)
        return {
            label: label,
            type: type,
            value: value,
            children: children
          }
    }
    
}
