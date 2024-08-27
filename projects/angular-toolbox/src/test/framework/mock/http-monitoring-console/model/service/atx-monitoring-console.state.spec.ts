/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxMonitoringConsoleState } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.state";
import { SizeUtil } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/util/size.util";
import { EMPTY_STRING, Log, LogBuilder, LogLevel, Uuid } from "projects/angular-toolbox/src/public-api";

describe('AtxUserActionService', () => {

    const url: URL = new URL("http://fake-url.com");
    const data: any = { foo: "bar "};
    const buildMetadata = ()=> {
        return {
            duration: 260,
            stalled: 964,
            start: 695,
            url: url,
            id: Uuid.build()
        }
    };
    const log1: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { response: {}, requestMetadata: buildMetadata() });
    const log2: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR, { response: {}, requestMetadata: buildMetadata() });
    let service: AtxMonitoringConsoleState;
    
    beforeEach(() => {
        service = new AtxMonitoringConsoleState();
    });
    
    it('should create a new instance', () => {
        expect(service).toBeTruthy();
    });
    
    it('selectedLog should be null by default', () => {
        expect(service.selectedLog).toBeNull();
    });
    
    it('cumulativeSize should be SizeUtil.INITIAL_SIZE by default', () => {
        expect(service.cumulativeSize).toEqual(SizeUtil.INITIAL_SIZE);
    });

    it('logs should be empty by default', () => {
        expect(service.logs.length).toEqual(0);
    });
    
    it('numLogs should be equal to 0 by default', () => {
        expect(service.numLogs).toEqual(0);
    });

    it('init() should invoke addLog() for each log', () => {
        spyOn(service, "addLog");
        service.init([log1, log2]);
        expect(service.addLog).toHaveBeenCalledTimes(2);
    });
    
    it('addLog() should add logs to the log list', () => {
        service.addLog(log1);
        service.addLog(log2);
        expect(service.logs.includes(log1)).toBeTrue();
        expect(service.logs.includes(log2)).toBeTrue();
    });
    
    it('addLog() should increase numLogs', () => {
        service.addLog(log1);
        service.addLog(log2);
        expect(service.numLogs).toEqual(2);
    });
    
    it('addLog() should invoke SizeUtil.getSize() when the log level is not LogLevel.CONFIG', () => {
        spyOn(SizeUtil, "getSize");
        service.addLog(log1);
        service.addLog(log2);
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.WARNING, { response: {}, requestMetadata: buildMetadata() }));
        expect(SizeUtil.getSize).toHaveBeenCalledTimes(3);
    });
    
    it('addLog() should not invoke SizeUtil.getSize() when the log level is LogLevel.CONFIG', () => {
        spyOn(SizeUtil, "getSize");
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, { response: {}, requestMetadata: buildMetadata() }));
        expect(SizeUtil.getSize).not.toHaveBeenCalled();
    });

    it('addLog() should invoke SizeUtil.sizeToString() when the log level is not LogLevel.CONFIG', () => {
        spyOn(SizeUtil, "sizeToString");
        service.addLog(log1);
        service.addLog(log2);
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.WARNING, { response: {}, requestMetadata: buildMetadata() }));
        expect(SizeUtil.sizeToString).toHaveBeenCalledTimes(3);
    });
    
    it('addLog() should not invoke SizeUtil.sizeToString() when the log level is LogLevel.CONFIG', () => {
        spyOn(SizeUtil, "sizeToString");
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, { response: {}, requestMetadata: buildMetadata() }));
        expect(SizeUtil.sizeToString).not.toHaveBeenCalled();
    });
    
    it('addLog() should not update size when the log level is LogLevel.CONFIG', () => {
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, { response: { body: data }, requestMetadata: buildMetadata() }));
        expect(service.cumulativeSize).toEqual(SizeUtil.INITIAL_SIZE);
    });
    
    it('addLog() should update size when the log level is not LogLevel.CONFIG', () => {
        service.addLog(LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { response: { body: data }, requestMetadata: buildMetadata() }));
        expect(service.cumulativeSize).not.toEqual(SizeUtil.INITIAL_SIZE);
    });
    
    it('addLog() should replace the log when the log level is LogLevel.CONFIG', () => {
        const log3: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG, { response: { body: data }, requestMetadata: buildMetadata() })
        const log3Updated: Log = LogBuilder.build(log3.caller, log3.message, LogLevel.INFO, log3.metadata);
        service.addLog(log1);
        service.addLog(log3);
        service.addLog(log2);
        service.addLog(log3Updated);
        expect(service.logs.length).toEqual(3);
        expect(service.logs[1]).toBe(log3Updated);
    });
    
    it('selectLog() should set the selectedLog value with the specified log', () => {
        service.selectLog(log1);
        expect(service.selectedLog).toBe(log1);
    });
    
    it('clearLogs() should set selectedLog to null', () => {
        service.addLog(log1);
        service.addLog(log2);
        service.clearLogs();
        expect(service.selectedLog).toBeNull();
    });
    
    it('clearLogs() should set cumulativeSize to SizeUtil.INITIAL_SIZE', () => {
        service.addLog(log1);
        service.addLog(log2);
        service.clearLogs();
        expect(service.cumulativeSize).toEqual(SizeUtil.INITIAL_SIZE);
    });
    
    it('clearLogs() should set numLogs to 0', () => {
        service.addLog(log1);
        service.addLog(log2);
        service.clearLogs();
        expect(service.numLogs).toEqual(0);
    });
    
    it('clearLogs() should set the logs size to 0', () => {
        service.addLog(log1);
        service.addLog(log2);
        service.clearLogs();
        expect(service.logs.length).toEqual(0);
    });
});
