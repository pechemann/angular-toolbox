/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ConsoleLogConnector, DEFAULT_LOG_CONNECTOR, HttpMockLoggingService, Log, LogConnector, LogLevel } from 'projects/angular-toolbox/src/public-api';

describe('HttpMockLoggingService', () => {

    
    let service: HttpMockLoggingService;

    beforeEach(() => {
        service = new HttpMockLoggingService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('getLogConnector() should return a reference to DEFAULT_LOG_CONNECTOR by delault', () => {
        expect(service.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
    });
    
    it('setLogConnector() should change the log connector', () => {
        const CONNECTOR: LogConnector = new ConsoleLogConnector();
        service.setLogConnector(CONNECTOR);
        expect(service.getLogConnector()).toBe(CONNECTOR);
    });
    
    it('info() should send log to the log connector', () => {
        spyOn(DEFAULT_LOG_CONNECTOR, "sendLog");
        const metadata: any = {};
        service.info(metadata);
        expect(DEFAULT_LOG_CONNECTOR.sendLog).toHaveBeenCalled();
    });
    
    it('error() should send log to the log connector', () => {
        spyOn(DEFAULT_LOG_CONNECTOR, "sendLog");
        const metadata: any = {};
        service.error(metadata);
        expect(DEFAULT_LOG_CONNECTOR.sendLog).toHaveBeenCalled();
    });
    
    it('info() should return the expected log', () => {
        const metadata: any = {};
        const log: Log = service.info(metadata);
        expect(log.caller).toEqual("HTTP Mocking Framework");
        expect(log.level).toEqual(LogLevel.INFO);
        expect(log.message).toEqual("HTTP response");
        expect(log.metadata).toBe(metadata);
    });
    
    it('error() should return the expected log', () => {
        const metadata: any = {};
        const log: Log = service.error(metadata);
        expect(log.caller).toEqual("HTTP Mocking Framework");
        expect(log.level).toEqual(LogLevel.ERROR);
        expect(log.message).toEqual("HTTP error");
        expect(log.metadata).toBe(metadata);
    });
    
    it('destoy() should kill internal processes', () => {
        const metadata: any = {};
        const sendInfo = ()=> service.info(metadata);
        const sendError = ()=> service.error(metadata);
        service.destroy();
        expect(sendInfo).toThrowError();
        expect(sendError).toThrowError();
    });
    
    it('ngOnDestroy() shouldinvoke the destoy() method', () => {
        spyOn(service, "destroy");
        service.ngOnDestroy();
        expect(service.destroy).toHaveBeenCalled();
    });
});