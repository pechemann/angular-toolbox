/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxConsoleLogConnector } from "projects/angular-toolbox/src/lib/framework/log/connector/atx-console-log-connector";
import { AtxAbstractLogger, AtxLog, AtxLogConnector, AtxLogLevel, DEFAULT_LOG_CONNECTOR } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const METADATA: any = {
    foo: 1,
    bar: "bar"
};

class TestLoggerClass extends AtxAbstractLogger {}

describe('AtxBaseLogger', () => {

    let logger: AtxAbstractLogger;

    beforeEach(async () => {
        logger = new TestLoggerClass();
    });

    it('should create a new instance', () => {
        expect(logger).toBeTruthy();
    });

    it('getLogConnector() should return the reference to the DEFAULT_LOG_CONNECTOR instance', () => {
        expect(logger.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
    });

    it('setLogConnector() should change the reference to the log connector instance', () => {
        const connector: AtxLogConnector = new AtxConsoleLogConnector();
        logger.setLogConnector(connector);
        expect(logger.getLogConnector()).toBe(connector);
    });

    it('setLogConnector(null) should set the reference to the DEFAULT_LOG_CONNECTOR instance', () => {
        const connector: AtxLogConnector = new AtxConsoleLogConnector();
        logger.setLogConnector(connector);
        logger.setLogConnector(null);
        expect(logger.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
    });

    it('setLogConnector() should destroy the previous log connector instance', () => {
        const initialConnector: AtxLogConnector = logger.getLogConnector();
        spyOn(initialConnector, "destroy");
        const connector: AtxLogConnector = new AtxConsoleLogConnector();
        logger.setLogConnector(connector);
        expect(initialConnector.destroy).toHaveBeenCalled();
    });

    it('setLogConnector() should inititialize log connector instance with the log list', () => {
        const logs: AtxLog[] = logger.getLogs();
        const connector: AtxLogConnector = new AtxConsoleLogConnector();
        spyOn(connector, "init");
        logger.setLogConnector(connector);
        expect(connector.init).toHaveBeenCalledWith(logs);
    });

    it('getLogs() should return an empty list of logs by default', () => {
        expect(logger.getLogs().length).toEqual(0);
    });

    it('log() should add a log with level AtxLogLevel.LOG and the specified parameters to the list of logs', () => {
        logger.log(CALLER, LOG_MESSAGE, METADATA);
        const log: AtxLog = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(AtxLogLevel.LOG);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('error() should add a log with level AtxLogLevel.ERROR and the specified parameters to the list of logs', () => {
        logger.error(CALLER, LOG_MESSAGE, METADATA);
        const log: AtxLog = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(AtxLogLevel.ERROR);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('warn() should add a log with level AtxLogLevel.WARNING and the specified parameters to the list of logs', () => {
        logger.warn(CALLER, LOG_MESSAGE, METADATA);
        const log: AtxLog = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(AtxLogLevel.WARNING);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('log() should send the log to the log connector', () => {
        const connector: AtxLogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.log(CALLER, LOG_MESSAGE);
        const log: AtxLog = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('error() should send the log to the log connector', () => {
        const connector: AtxLogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.error(CALLER, LOG_MESSAGE);
        const log: AtxLog = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('warn() should send the log to the log connector', () => {
        const connector: AtxLogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.warn(CALLER, LOG_MESSAGE);
        const log: AtxLog = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
});
