/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockLoggingConstant } from "../../../../model/business/logging/http-mock-logging-constant.enum";
import { HttpMockLoggingMetadata, Log, LogLevel } from "../../../../model";
import { AtxHttpLogDto } from "../model/business/dto/atx-http-log.dto";

export class LogConverter {

    public static logToDto(log: Log): AtxHttpLogDto {
        return {
            level: log.level,
            timestamp: log.timestamp,
            metadata: LogConverter.metadataToDto(log.metadata)
        }
    }

    public static dtoToLog(dto: AtxHttpLogDto): Log {
        const level: LogLevel = dto.level;
        const log = {
            caller: HttpMockLoggingConstant.CALLER,
            level: level,
            timestamp: dto.timestamp,
            message: LogConverter.getMessage(level)
        }
        return log;
    }
    
    private static metadataToDto(metadata: HttpMockLoggingMetadata): any {
        return metadata;
    }

    private static getMessage(level: LogLevel): HttpMockLoggingConstant {
        if (level === LogLevel.INFO) return HttpMockLoggingConstant.RESPONSE_MESSAGE;
        if (level === LogLevel.ERROR) return HttpMockLoggingConstant.ERROR_MESSAGE;
        return HttpMockLoggingConstant.CONFIG_MESSAGE;
    }
}
