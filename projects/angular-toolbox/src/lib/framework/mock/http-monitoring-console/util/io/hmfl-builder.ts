/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxHttpLogDto } from "../../model/business/io/atx-http-log.dto";
import { HMFL } from "../../model/business/io/hmfl";

/**
 * @private
 * A utility class that creates `HMFL` objects.
 */
export class HMFLBuilder {

    /**
     * @private
     * Creates and returns a new `HMFL` object.
     * 
     * @param logDtoList The list of serialized logs to include in the new `HMFL` object.
     * @returns A new `HMFL` object.
     */
    public static build(logDtoList: AtxHttpLogDto[]): HMFL {
        return {
            logs: logDtoList,
            timestamp: Date.now()
        };
    }
}
