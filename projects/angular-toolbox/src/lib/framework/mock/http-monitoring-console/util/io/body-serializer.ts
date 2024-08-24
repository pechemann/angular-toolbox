/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "../console-body-type";
import { FormDataSerializer } from "./form-data-serializer";

/**
 * @private
 * A utility class that serialize and unserialize the objects rendered into the monitoring console.
 */
export class BodySerializer {

    /**
     * @private
     * Serializes the specified object depending on the `type` parameter.
     * 
     * @param data The object to serialize.
     * @param type The type of the object to serialize.
     * @returns A string, or `null` whether the object type is not supported.
     */
    public static serialize(data: any, type: ConsoleBodyType): string | null {
        if (type === ConsoleBodyType.TEXT) return data;
        if (type === ConsoleBodyType.JSON) return JSON.stringify(data);
        if (type === ConsoleBodyType.BLOB) return null;
        if (type === ConsoleBodyType.FORM_DATA) return JSON.stringify(Array.from(data));
        if (type === ConsoleBodyType.ARRAY_BUFFER) null;
        return null;
    }
    
    /**
     * @private
     * Unserializes the specified string depending on the `type` parameter.
     * 
     * @param data The string to unserialize.
     * @param type The type of the object to unserialize.
     * @returns An object, or `null` whether the object type is not supported.
     */
    public static unserialize(data: any, type: ConsoleBodyType): any {
        if (type === ConsoleBodyType.TEXT) return data;
        if (type === ConsoleBodyType.JSON) return JSON.parse(data);
        if (type === ConsoleBodyType.BLOB) return null;
        if (type === ConsoleBodyType.FORM_DATA) return FormDataSerializer.unserialize(data);
        if (type === ConsoleBodyType.ARRAY_BUFFER) null;
        return null;
    }
}
