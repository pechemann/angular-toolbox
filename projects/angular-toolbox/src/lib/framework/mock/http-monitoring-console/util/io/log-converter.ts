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

export class LogConverter {

    public logToDto(log: Log): AtxHttpLogDto {
        return {
            level: log.level,
            timestamp: log.timestamp,
            metadata: LogMetadataConverter.metadataToDto(log.metadata)
        }
    }

    public dtoToLog(dto: AtxHttpLogDto): Log {
        const level: LogLevel = dto.level;
        const log: Log = {
            caller: HttpMockLoggingConstant.CALLER,
            level: level,
            timestamp: dto.timestamp,
            message: LogMessageUtil.getMessageFromLevel(level),
            metadata: LogMetadataConverter.dtoToMetadata(dto.metadata)
        }
        return log;
    }
}
