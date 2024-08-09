/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleLogConnector, AtxLogBuilder, AtxLogLevel } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const buildLog = (level: AtxLogLevel)=> {
    return AtxLogBuilder.build(CALLER, LOG_MESSAGE, level);
}

describe('AtxConsoleLogConnector', () => {

    let connector: AtxConsoleLogConnector = new AtxConsoleLogConnector();

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
    
    it('init() should send log to the console if a log is specified with AtxLogLevel.LOG', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(AtxLogLevel.LOG)]);
        expect(console.log).toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should send warning to the console if a log is specified with AtxLogLevel.WARNING', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(AtxLogLevel.WARNING)]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('init() should send error to the console if a log is specified with AtxLogLevel.ERROR', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.init([buildLog(AtxLogLevel.ERROR)]);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });
    
    it('sendLog() should send log to the console if a log is specified with AtxLogLevel.LOG', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(AtxLogLevel.LOG));
        expect(console.log).toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should send warning to the console if a log is specified with AtxLogLevel.WARNING', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(AtxLogLevel.WARNING));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });
    
    it('sendLog() should send error to the console if a log is specified with AtxLogLevel.ERROR', () => {
        spyOn(console, "log");
        spyOn(console, "warn");
        spyOn(console, "error");
        connector.sendLog(buildLog(AtxLogLevel.ERROR));
        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });
});
