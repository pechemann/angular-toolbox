/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DialogBackdropType } from "./dialog-backdrop-type.enum";
import { DialogBackdrop } from "./dialog-backdrop.type";

/**
 * Defines the configuration associated with a custom component displayed through the Dialog API.
 */
export interface DialogConfig {

    /**
     * Indicates whether the dialog is modal, or static.
     */
    backdrop?: DialogBackdrop | DialogBackdropType;
}
