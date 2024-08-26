/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * The interface that must be implementd by ATX HTTP header DTOs.
 */
export interface AtxHeaderDto {

    /**
     * @private
     * The name of the HTTP header.
     */
    name: string;

    /**
     * @private
     * The value of the HTTP header.
     */
    value: string[] | null;
}
