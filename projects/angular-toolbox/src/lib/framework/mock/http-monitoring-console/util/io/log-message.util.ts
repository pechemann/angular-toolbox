/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingConstant } from "../../../../../model/business/logging/http-mock-logging-constant.enum";
import { LogLevel } from "../../../../../model";

/**
 * @private
 * A utility class that returns a human-readable message depending on the specified level.
 */
export class LogMessageUtil {
    
    /**
     * @private
     * Returns a human-readable message depending on the specified level.
     * 
     * @param level The level for which to get the message.
     * @returns A string.
     */
    public static getMessageFromLevel(level: LogLevel): HttpMockLoggingConstant {
        if (level === LogLevel.INFO) return HttpMockLoggingConstant.RESPONSE_MESSAGE;
        if (level === LogLevel.ERROR) return HttpMockLoggingConstant.ERROR_MESSAGE;
        return HttpMockLoggingConstant.CONFIG_MESSAGE;
    }
}
