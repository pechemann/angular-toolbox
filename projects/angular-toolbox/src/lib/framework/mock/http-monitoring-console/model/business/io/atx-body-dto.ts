/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleBodyType } from "../../../util/console-body-type";

/**
 * @private
 * The interface that must be implementd by ATX body DTOs.
 */
export interface AtxBodyDto {

    /**
     * @private
     * Specifies the type of data.
     */
    type: ConsoleBodyType;

    /**
     * @private
     * The data used as HTTP request body.
     */
    data: string | null;
}
