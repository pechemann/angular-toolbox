/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { AbstractLogger, Log, LogConnector, LogLevel, DEFAULT_LOG_CONNECTOR, ConsoleLogConnector } from "projects/angular-toolbox/src/public-api";

const CALLER: string = "testSuite";
const LOG_MESSAGE: string = "Log message";
const METADATA: any = {
    foo: 1,
    bar: "bar"
};

class TestLoggerClass extends AbstractLogger {}

describe('BaseLogger', () => {

    let logger: AbstractLogger;

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
        const connector: LogConnector = new ConsoleLogConnector();
        logger.setLogConnector(connector);
        expect(logger.getLogConnector()).toBe(connector);
    });

    it('setLogConnector(null) should set the reference to the DEFAULT_LOG_CONNECTOR instance', () => {
        const connector: LogConnector = new ConsoleLogConnector();
        logger.setLogConnector(connector);
        logger.setLogConnector(null);
        expect(logger.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
    });

    it('setLogConnector() should inititialize log connector instance with the log list', () => {
        const logs: Log[] = logger.getLogs();
        const connector: LogConnector = new ConsoleLogConnector();
        spyOn(connector, "init");
        logger.setLogConnector(connector);
        expect(connector.init).toHaveBeenCalledWith(logs);
    });

    it('getLogs() should return an empty list of logs by default', () => {
        expect(logger.getLogs().length).toEqual(0);
    });

    it('info() should add a log with level LogLevel.INFO and the specified parameters to the list of logs', () => {
        logger.info(CALLER, LOG_MESSAGE, METADATA);
        const log: Log = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(LogLevel.INFO);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('config() should add a log with level LogLevel.CONFIG and the specified parameters to the list of logs', () => {
        logger.config(CALLER, LOG_MESSAGE, METADATA);
        const log: Log = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(LogLevel.CONFIG);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('error() should add a log with level LogLevel.ERROR and the specified parameters to the list of logs', () => {
        logger.error(CALLER, LOG_MESSAGE, METADATA);
        const log: Log = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(LogLevel.ERROR);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('warn() should add a log with level LogLevel.WARNING and the specified parameters to the list of logs', () => {
        logger.warn(CALLER, LOG_MESSAGE, METADATA);
        const log: Log = logger.getLogs()[0];
        expect(log.caller).toEqual(CALLER);
        expect(log.message).toEqual(LOG_MESSAGE);
        expect(log.level).toEqual(LogLevel.WARNING);
        expect(log.metadata).toBe(METADATA);
    });
    
    it('info() should send the log to the log connector', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.info(CALLER, LOG_MESSAGE);
        const log: Log = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('config() should send the log to the log connector', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.config(CALLER, LOG_MESSAGE);
        const log: Log = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('error() should send the log to the log connector', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.error(CALLER, LOG_MESSAGE);
        const log: Log = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('warn() should send the log to the log connector', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.warn(CALLER, LOG_MESSAGE);
        const log: Log = logger.getLogs()[0];
        expect(connector.sendLog).toHaveBeenCalledWith(log);
    });
    
    it('destroy() should set the log connector internal reference to null', () => {
        const connector: LogConnector = new ConsoleLogConnector();
        logger.setLogConnector(connector);
        logger.destroy();
        expect(logger.getLogConnector()).toBeNull();
    });
    
    it('minLogLevel should be LogLevel.INFO by default', () => {
        expect(logger.minLogLevel).toEqual(LogLevel.INFO);
    });
    
    it('log should not be sent to the log connector when minLogLevel is LogLevel.OFF', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.minLogLevel = LogLevel.OFF;
        logger.info(CALLER, LOG_MESSAGE);
        logger.config(CALLER, LOG_MESSAGE);
        logger.warn(CALLER, LOG_MESSAGE);
        logger.error(CALLER, LOG_MESSAGE);
        expect(connector.sendLog).not.toHaveBeenCalled();
    });
    
    it('only ERROR logs should be sent to the log connector when minLogLevel is LogLevel.ERROR', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.minLogLevel = LogLevel.ERROR;
        logger.info(CALLER, LOG_MESSAGE);
        logger.config(CALLER, LOG_MESSAGE);
        logger.warn(CALLER, LOG_MESSAGE);
        logger.error(CALLER, LOG_MESSAGE);
        expect(connector.sendLog).toHaveBeenCalledTimes(1);
        logger.getLogs().forEach(log=> {
            expect(log.level).toBeGreaterThanOrEqual(LogLevel.ERROR);
        });
    });
    
    it('only ERROR and WARNING logs should be sent to the log connector when minLogLevel is LogLevel.WARNING', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.minLogLevel = LogLevel.WARNING;
        logger.info(CALLER, LOG_MESSAGE);
        logger.config(CALLER, LOG_MESSAGE);
        logger.warn(CALLER, LOG_MESSAGE);
        logger.error(CALLER, LOG_MESSAGE);
        expect(connector.sendLog).toHaveBeenCalledTimes(2);
        logger.getLogs().forEach(log=> {
            expect(log.level).toBeGreaterThanOrEqual(LogLevel.WARNING);
        });
    });
    
    it('only ERROR, WARNING and CONFIG logs should be sent to the log connector when minLogLevel is LogLevel.CONFIG', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.minLogLevel = LogLevel.CONFIG;
        logger.info(CALLER, LOG_MESSAGE);
        logger.config(CALLER, LOG_MESSAGE);
        logger.warn(CALLER, LOG_MESSAGE);
        logger.error(CALLER, LOG_MESSAGE);
        expect(connector.sendLog).toHaveBeenCalledTimes(3);
        logger.getLogs().forEach(log=> {
            expect(log.level).toBeGreaterThanOrEqual(LogLevel.CONFIG);
        });
    });
    
    it('all logs should be sent to the log connector when minLogLevel is LogLevel.INFO', () => {
        const connector: LogConnector = logger.getLogConnector();
        spyOn(connector, "sendLog");
        logger.minLogLevel = LogLevel.INFO;
        logger.info(CALLER, LOG_MESSAGE);
        logger.config(CALLER, LOG_MESSAGE);
        logger.warn(CALLER, LOG_MESSAGE);
        logger.error(CALLER, LOG_MESSAGE);
        expect(connector.sendLog).toHaveBeenCalledTimes(4);
        logger.getLogs().forEach(log=> {
            expect(log.level).toBeGreaterThanOrEqual(LogLevel.INFO);
        });
    });
});
