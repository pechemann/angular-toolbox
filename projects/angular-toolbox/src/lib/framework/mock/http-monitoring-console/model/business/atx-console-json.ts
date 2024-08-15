/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleTypeClass } from "../../util/console-type-class";

export interface AtxConsoleJson {

    label?: string;

    value: any;

    typeClass: ConsoleTypeClass;

    children?: AtxConsoleJson[];
}