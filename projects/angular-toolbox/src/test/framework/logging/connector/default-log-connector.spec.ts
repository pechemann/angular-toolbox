/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DefaultLogConnector, LogBuilder, LogLevel } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const buildLog = (level: LogLevel)=> {
    return LogBuilder.build(CALLER, LOG_MESSAGE, level);
};

describe('ConsoleLogConnector', () => {

    let connector: DefaultLogConnector = new DefaultLogConnector();

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
    
    it('init() should do nothing', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should do nothing if a log is specified with LogLevel.LOG', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.LOG));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should do nothing if a log is specified with LogLevel.WARNING', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.WARNING));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should do nothing if a log is specified with LogLevel.ERROR', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(LogLevel.ERROR));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
});
