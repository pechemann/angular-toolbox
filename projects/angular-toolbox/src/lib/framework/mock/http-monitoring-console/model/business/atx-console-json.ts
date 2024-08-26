/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleTypeClass } from "../../util/console-type-class";

/**
 * @private
 * A tree representation of HTTP request data.
 */
export interface AtxConsoleJson {

    /**
     * @private
     * The optional string representation of the data.
     */
    label?: string;

    /**
     * @private
     * The raw value of the data.
     */
    value: any;

    /**
     * @private
     * The CSS class determined according to the data type.
     */
    typeClass: ConsoleTypeClass;

    /**
     * @private
     * The list of nested serialized data, if any (for Arrays and JSON objects).
     */
    children?: AtxConsoleJson[];
}