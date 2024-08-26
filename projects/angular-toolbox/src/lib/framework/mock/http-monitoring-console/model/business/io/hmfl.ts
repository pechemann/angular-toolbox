/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpLogDto } from "./atx-http-log.dto";

/**
 * @private
 * This interface represents the file format of logs exported by the monitoring console.
 */
export interface HMFL {

    /**
     * @private
     * The list of serialized logs to export.
     */
    logs: AtxHttpLogDto[];

    /**
     * @private
     * The timestamp at which the logs have been exported.
     */
    timestamp: number;
}