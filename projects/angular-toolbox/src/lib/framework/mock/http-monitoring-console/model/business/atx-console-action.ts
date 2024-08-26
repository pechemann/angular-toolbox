/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleActionType } from "./atx-console-action-type";

/**
 * @private
 * Defines a user action.
 */
export interface AtxConsoleAction {

    /**
     * @private
     * The type of action triggered by the user.
     */
    type: AtxConsoleActionType;

    /**
     * @private
     * Optional data associated with the triggered action.
     */
    data?: any;
}