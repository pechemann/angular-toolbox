/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMonitoringConsoleLogConnector } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/connector/http-monitoring-console-log-connector";
import { EMPTY_STRING, Log, LogBuilder, LogLevel } from "projects/angular-toolbox/src/public-api";

describe('HttpMonitoringConsoleLogConnector', () => {

    let connector: HttpMonitoringConsoleLogConnector;
    
    beforeEach(() => {
        connector = new HttpMonitoringConsoleLogConnector();
    });
    
    it('should create', () => {
        expect(connector).toBeTruthy();
    });
    
    it('logs array should be empty by default', () => {
        expect(connector.logs.length).toEqual(0);
    });
    
    it('init() should initialize the connector with the specified logs', () => {
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING);
        connector.init([log]);
        expect(connector.logs[0]).toBe(log);
    });

    it('init() should no invoke the change event emitter', () => {
        spyOn(connector, "change");
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING);
        connector.init([log]);
        expect(connector.change).not.toHaveBeenCalled();
    });

    it('sendLog() should add the specified log to the connector', () => {
        const log: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING);
        connector.sendLog(log);
        expect(connector.logs[0]).toBe(log);
    });

    it('sendLog() should only add error and info logs to the connector', () => {
        const log1: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO);
        const log2: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR);
        const log3: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.WARNING);
        const log4: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG);
        connector.sendLog(log1);
        connector.sendLog(log2);
        connector.sendLog(log3);
        connector.sendLog(log4);
        expect(connector.logs.includes(log1)).toBeTrue();
        expect(connector.logs.includes(log2)).toBeTrue();
        expect(connector.logs.includes(log3)).toBeFalse();
        expect(connector.logs.includes(log4)).toBeFalse();
    });
    
    it('sendLog() should invoke the change event emitter for each type of log', () => {
        spyOn(connector.change, "emit");
        const log1: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO);
        const log2: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR);
        const log3: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.WARNING);
        const log4: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.CONFIG);
        connector.sendLog(log1);
        expect(connector.change.emit).toHaveBeenCalledWith(log1);
        connector.sendLog(log2);
        expect(connector.change.emit).toHaveBeenCalledWith(log2);
        connector.sendLog(log3);
        expect(connector.change.emit).toHaveBeenCalledWith(log3);
        connector.sendLog(log4);
        expect(connector.change.emit).toHaveBeenCalledWith(log4);
    });
    
    it('clearLogs() should remove all logs from the connector', () => {
        const log1: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO);
        const log2: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.ERROR);
        connector.sendLog(log1);
        connector.sendLog(log2);
        expect(connector.logs.length).toEqual(2);
        connector.clearLogs();
        expect(connector.logs.length).toEqual(0);
    });
    
    it('destroy() should invoke the clearLogs() method', () => {
        spyOn(connector, "clearLogs");
        connector.destroy();
        expect(connector.clearLogs).toHaveBeenCalled();
    });
});
