/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleLogConnector, LogBuilder, LogLevel } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const buildLog = (level: LogLevel)=> {
    return LogBuilder.build(CALLER, LOG_MESSAGE, level);
}

describe('ConsoleLogConnector', () => {

    let connector: ConsoleLogConnector = new ConsoleLogConnector();

    it('should create an instance', () => {
        expect(connector).toBeTruthy();
    });
    
    it('destroy() should do nothing', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        expect(connector.destroy()).toBe(void 0);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('copyLogs() should do nothing', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        expect(connector.copyLogs()).toBe(void 0);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should do nothing if list is empty', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should send log to the console if a log is specified with LogLevel.LOG', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(LogLevel.LOG)]);
        expect(console.log).toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should send warning to the console if a log is specified with LogLevel.WARNING', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(LogLevel.WARNING)]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should send error to the console if a log is specified with LogLevel.ERROR', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(LogLevel.ERROR)]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });
    
    it('sendLog() should send log to the console if a log is specified with LogLevel.LOG', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.LOG));
        expect(console.log).toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should send warning to the console if a log is specified with LogLevel.WARNING', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.WARNING));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should send error to the console if a log is specified with LogLevel.ERROR', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.ERROR));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });
});
