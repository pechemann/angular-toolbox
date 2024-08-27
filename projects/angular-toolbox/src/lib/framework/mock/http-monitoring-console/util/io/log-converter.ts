/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingConstant } from "../../../../../model/business/logging/http-mock-logging-constant.enum";
import { Log, LogLevel } from "../../../../../model";
import { AtxHttpLogDto } from "../../model/business/io/atx-http-log.dto";
import { LogMessageUtil } from "./log-message.util";
import { LogMetadataConverter } from "./log-metadata-converter";
import { LogBuilder } from "../../../../../framework";

/**
 * @private
 * A utility class that converts `Log` objects into `AtxHttpLogDto` objects.
 */
export class LogConverter {

    /**
     * @private
     * Converts a `object` object into an `AtxHttpLogDto` object.
     * 
     * @param log The `Log` object to convert.
     * @returns A new `AtxHttpLogDto` object.
     */
    public static logToDto(log: Log): AtxHttpLogDto {
        return {
            level: log.level,
            timestamp: log.timestamp,
            metadata: LogMetadataConverter.metadataToDto(log.metadata)
        };
    }

    /**
     * @private
     * Converts an `AtxHttpLogDto` object into a `Log` object.
     * 
     * @param dto The `AtxHttpLogDto` object to convert.
     * @returns A new `Log` object.
     */
    public static dtoToLog(dto: AtxHttpLogDto): Log {
        const level: LogLevel = dto.level;
        return LogBuilder.build(
            HttpMockLoggingConstant.CALLER,
            LogMessageUtil.getMessageFromLevel(level),
            level,
            LogMetadataConverter.dtoToMetadata(dto.metadata)
        );
    }
}
