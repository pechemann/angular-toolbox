/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { AtxBodyDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-body-dto";
import { AtxHttpLogDto } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/atx-http-log.dto";
import { ConsoleBodyType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/console-body-type";
import { LogConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-converter";
import { LogMessageUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-message.util";
import { LogMetadataConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-metadata-converter";
import { HttpMockLoggingConstant } from "projects/angular-toolbox/src/lib/model/business/logging/http-mock-logging-constant.enum";
import { HttpMockLoggingMetadata, Log, LogBuilder, LogImpl, LogLevel, Uuid } from "projects/angular-toolbox/src/public-api";
import { STRING_DATA, URL_OBJ, URL_STRING } from "../../test-util/http-monitoring-test-util";

const metadata: HttpMockLoggingMetadata = {
    request: new HttpRequest("GET", URL_STRING),
    response: new HttpResponse(),
    requestMetadata: {
        duration: 0,
        id: Uuid.build(),
        start: 0,
        url: URL_OBJ,
        stalled: 0
    }
};

describe('LogConverter.logToDto()', () => {
    
    const caller: string = "test suite";
    const message: string = "test message";
    let log: Log;

    beforeEach(() => {
        log = LogBuilder.build(caller, message, LogLevel.CONFIG, metadata);
    });

    it('logToDto() should return an AtxHttpLogDto object', () => {
        const dto: any = LogConverter.logToDto(log);
        expect(dto.hasOwnProperty("level")).toBeTrue();
        expect(dto.hasOwnProperty("timestamp")).toBeTrue();
        expect(dto.hasOwnProperty("metadata")).toBeTrue();
    });
    
    it('AtxHttpLogDto.level should be set with the specified value', () => {
        const dto: any = LogConverter.logToDto(log);
        expect(dto.level).toEqual(LogLevel.CONFIG);
    });

    it('AtxHttpLogDto.timestamp should be set with the specified value', () => {
        const dto: any = LogConverter.logToDto(log);
        expect(dto.timestamp).toEqual(log.timestamp);
    });

    it('logToDto() should invoke the LogMetadataConverter.metadataToDto() method', () => {
        spyOn(LogMetadataConverter, "metadataToDto");
        LogConverter.logToDto(log);
        expect(LogMetadataConverter.metadataToDto).toHaveBeenCalledOnceWith(metadata);
    });
});

describe('LogConverter.dtoToLog()', () => {

    const body: AtxBodyDto = {
        data: STRING_DATA,
        type: ConsoleBodyType.JSON
    }
    const buildDto = ()=> {
        const dto: AtxHttpLogDto = {
            level: LogLevel.ERROR,
            timestamp: Date.now(),
            metadata: {
                request: {
                    body: body,
                    reportProgress: true,
                    withCredentials: true,
                    responseType: "blob",
                    method: "POST",
                    headers: [],
                    url: URL_STRING,
                    params: "foo=bar"
                },
                response: {
                    body: body,
                    headers: [],
                    status: HttpStatusCode.AlreadyReported,
                    statusText: "Already Reported",
                    url: URL_STRING
                },
                requestMetadata: {
                    id: Uuid.build().toString(),
                    start: 0,
                    stalled: 0,
                    duration: 0,
                    url: URL_STRING
                }
            }
        }
        return dto;
    };

    it('dtoToLog() should return a Log object', () => {
        const dto: any = buildDto();
        const log = LogConverter.dtoToLog(dto);
        expect(log).toBeInstanceOf(LogImpl);
    });
    
    it('level property should be set with the specified value', () => {
        const dto: any = buildDto();
        const log = LogConverter.dtoToLog(dto);
        expect(log.level).toEqual(dto.level);
    });

    it('caller property should be set with HttpMockLoggingConstant.CALLER', () => {
        const dto: any = buildDto();
        const log = LogConverter.dtoToLog(dto);
        expect(log.caller).toEqual(HttpMockLoggingConstant.CALLER);
    });
    
    it('dtoToLog() should invoke the LogMessageUtil.getMessageFromLevel()', () => {
        spyOn(LogMessageUtil, "getMessageFromLevel");
        const dto: any = buildDto();
        LogConverter.dtoToLog(dto);
        expect(LogMessageUtil.getMessageFromLevel).toHaveBeenCalledOnceWith(dto.level);
    });
    
    it('dtoToLog() should invoke the LogMetadataConverter.dtoToMetadata()', () => {
        spyOn(LogMetadataConverter, "dtoToMetadata");
        const dto: any = buildDto();
        LogConverter.dtoToLog(dto);
        expect(LogMetadataConverter.dtoToMetadata).toHaveBeenCalledOnceWith(dto.metadata);
    });
});
