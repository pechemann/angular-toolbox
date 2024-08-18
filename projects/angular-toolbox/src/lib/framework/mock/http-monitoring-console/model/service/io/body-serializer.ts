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
}
