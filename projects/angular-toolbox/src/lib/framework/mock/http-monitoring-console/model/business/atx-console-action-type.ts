/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * @private
 * A utility class that indicates the type of user's action.
 */
export enum AtxConsoleActionType {

    /**
     * @private
     * Idincates that the logs must be cleared.
     */
    CLEAR_LOGS = 0,

    /**
     * @private
     * Idincates that the logs must be exported.
     */
    EXPORT_LOGS = 1,

    /**
     * @private
     * Idincates that logs must be imported.
     */
    IMPORT_LOGS = 2,
    
    /**
     * @private
     * Idincates that the a log is selected.
     */
    LOG_SELECT = 3,

    /**
     * @private
     * Idincates that the details panel must be closed.
     */
    CLOSE_DETAILS_PANEL = 4
}