/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { HMFL } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/io/hmfl";
import { AtxLogIoService } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-log-io.service";
import { HMFLBuilder } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/hmfl-builder";
import { LogConverter } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/io/log-converter";
import { EMPTY_STRING, HttpMockLoggingMetadata, HttpMockLoggingService, Log, LogBuilder, LogLevel, Uuid } from "projects/angular-toolbox/src/public-api";

const FILE_NAME_REGEXP: RegExp = /logs-\d{2}\/\d{2}\/\d{2}-\d{2}:\d{2}-(A|P)M\.hmfl/;
const url: string = "http://fake-url.com";

const metadata: HttpMockLoggingMetadata = {
    request: new HttpRequest("GET", url),
    response: new HttpResponse(),
    requestMetadata: {
        duration: 0,
        stalled: 0,
        start: 0,
        url: new URL(url),
        id: Uuid.build()
    }
};

const getFileList = (level: LogLevel = LogLevel.INFO) => {
    const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, level, metadata);
    const data: HMFL = HMFLBuilder.build([LogConverter.logToDto(log)]);
    const dt: DataTransfer = new DataTransfer();
    dt.items.add(new File([JSON.stringify(data)], "test.file"));
    return dt.files;
};

describe('AtxLogIoService', () => {

    let service: AtxLogIoService;
    let loggerSvc: HttpMockLoggingService;
    
    beforeEach(() => {
        loggerSvc = new HttpMockLoggingService();
        service = new AtxLogIoService(loggerSvc);
    });
    
    it('should create', () => {
        expect(service).toBeTruthy();
    });
    
    it('exportFile() should create an anchor element to download the file', () => {
        const logs: Log[] = [];
        const spyObj = jasmine.createSpyObj('a', ['click']);
        // spy on document.createElement() and return the spy object
        spyOn(document, 'createElement').and.returnValue(spyObj);
        service.exportFile(logs);
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(spyObj.click).toHaveBeenCalledTimes(1);
    });
    
    it('exportFile() should create a blob with the specified data', () => {
        const logs: Log[] = [];
        const spyObj = jasmine.createSpyObj('a', ['click']);
        spyOn(document, 'createElement').and.returnValue(spyObj);
        service.exportFile(logs);
        const href: string = spyObj.href;
        const uuid: string = href.substring(href.lastIndexOf("/") + 1);
        expect(href.startsWith("blob:http://localhost:")).toBeTrue();
        expect(Uuid.validate(uuid)).toBeTrue();
    });
    
    it('exportFile() should create a file with the correct file name', () => {
        const logs: Log[] = [];
        const spyObj = jasmine.createSpyObj('a', ['click']);
        spyOn(document, 'createElement').and.returnValue(spyObj);
        service.exportFile(logs);
        expect(FILE_NAME_REGEXP.test(spyObj.download)).toBeTrue();
    });
    
    it('exportFile() should process the specified well formatted logs without errors and invoke the LogConverter.logToDto() method', () => {
        const spyObj = jasmine.createSpyObj('a', ['click']);
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
        const logs: Log[] = [log];
        spyOn(document, 'createElement').and.returnValue(spyObj);
        spyOn(LogConverter, 'logToDto');
        service.exportFile(logs);
        expect(LogConverter.logToDto).toHaveBeenCalledOnceWith(log);
    });

    it('exportFile() should invoke the HMFLBuilder.build() method', (done) => {
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
        const file = HMFLBuilder.build([]);
        const logs: Log[] = [log];
        const spyObj = jasmine.createSpyObj('a', ['click']);
        spyOn(document, 'createElement').and.returnValue(spyObj);
        spyOn(HMFLBuilder, 'build').and.returnValue(file);
        service.exportFile(logs);
        setTimeout(()=> {
            expect(HMFLBuilder.build).toHaveBeenCalled();
            done();
        });
    });
    
    it('importFile() should invoke the LogConverter.dtoToLog() method ', (done) => {
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, metadata);
        spyOn(LogConverter, 'dtoToLog').and.returnValue(log);
        service.importFile(getFileList());
        setTimeout(()=> {
            expect(LogConverter.dtoToLog).toHaveBeenCalled();
            done();
        }, 100);
    });
    
    it('importFile() should invoke the logger info() method when imported logs are info logs', (done) => {
        spyOn(loggerSvc, 'info')
        service.importFile(getFileList());
        setTimeout(()=> {
            expect(loggerSvc.info).toHaveBeenCalled();
            done();
        }, 100);
    });
    
    it('importFile() should invoke the logger error() method when imported logs are error logs', (done) => {
        spyOn(loggerSvc, 'error')
        service.importFile(getFileList(LogLevel.ERROR));
        setTimeout(()=> {
            expect(loggerSvc.error).toHaveBeenCalled();
            done();
        }, 100);
    });
});
