/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { HttpMonitoringConsoleLogConnector } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/connector/http-monitoring-console-log-connector";
import { AtxConsoleActionType } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type";
import { AtxLogIoService } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-log-io.service";
import { AtxMonitoringConsoleController } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.controller";
import { AtxMonitoringConsoleState } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-monitoring-console.state";
import { AtxUserActionService } from "projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-user-action.service";
import { DEFAULT_LOG_CONNECTOR, EMPTY_STRING, HttpMockLoggingService, IdentifiableComponent, Log, LogBuilder, LogConnector, LogLevel, SubscriptionService, Uuid } from "projects/angular-toolbox/src/public-api";

const url: URL = new URL("http://fake-url.com");
const buildMetadata = ()=> {
    return {
        request: new HttpRequest("GET", "http://fake-url.com"),
        response: new HttpResponse(),
        requestMetadata: {
            duration: 260,
            stalled: 964,
            start: 695,
            url: url,
            id: Uuid.build()
        }
    }
};

describe('AtxMonitoringConsoleController', () => {

    let service: AtxMonitoringConsoleController;
    let loggerSvc: HttpMockLoggingService;
    let stateSvc: AtxMonitoringConsoleState;
    let ioSvc: AtxLogIoService;
    let subscribeSvc: SubscriptionService;
    let actionSvc: AtxUserActionService;
    
    beforeEach(() => {
        loggerSvc = new HttpMockLoggingService();
        stateSvc = new AtxMonitoringConsoleState();
        ioSvc = new AtxLogIoService(loggerSvc);
        subscribeSvc = new SubscriptionService();
        actionSvc = new AtxUserActionService();
    });
    
    it('should create a new instance', () => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        expect(service).toBeTruthy();
    });
    
    it('should extend the IdentifiableComponent class', () => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        expect(service).toBeInstanceOf(IdentifiableComponent);
    });

    it('should add an instance of the HttpMonitoringConsoleLogConnector class to the HttpMockLoggingService singleton', () => {
        expect(loggerSvc.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        expect(loggerSvc.getLogConnector()).toBeInstanceOf(HttpMonitoringConsoleLogConnector);
    });

    it('should initialize the log connector with the logs previously registered', () => {
        const log1 = loggerSvc.info(buildMetadata());
        const log2 = loggerSvc.error(buildMetadata());
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        const connector: HttpMonitoringConsoleLogConnector = loggerSvc.getLogConnector() as HttpMonitoringConsoleLogConnector;
        expect(connector.logs.includes(log1)).toBeTrue();
        expect(connector.logs.includes(log2)).toBeTrue();
    });

    it('should initialize the state service with the logs previously registered', () => {
        const log1 = loggerSvc.info(buildMetadata());
        const log2 = loggerSvc.error(buildMetadata());
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        expect(stateSvc.logs.includes(log1)).toBeTrue();
        expect(stateSvc.logs.includes(log2)).toBeTrue();
    });
    
    it('getClassRef() should should be "AtxMonitoringConsoleController"', () => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        expect(service.getClassRef()).toEqual("AtxMonitoringConsoleController");
    });
    
    it('ngOnDestroy() should invoke the SubscriptionService.clearAll() method', () => {
        spyOn(subscribeSvc, "clearAll");
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        service.ngOnDestroy();
        expect(subscribeSvc.clearAll).toHaveBeenCalledOnceWith(service);
    });
    
    it('ngOnDestroy() should destroy the log connector', () => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        const connector: LogConnector = loggerSvc.getLogConnector();
        spyOn(connector, "destroy");
        service.ngOnDestroy();
        expect(connector.destroy).toHaveBeenCalled();
    });
    
    it('ngOnDestroy() should reset the log connector', () => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        service.ngOnDestroy();
        expect(loggerSvc.getLogConnector()).toBe(DEFAULT_LOG_CONNECTOR);
    });
});

describe('AtxMonitoringConsoleController: User\'s actions managmenent. Test all stategies managed by the internal onAction() method', () => {
    
    const log1: Log = LogBuilder.build(EMPTY_STRING, EMPTY_STRING, LogLevel.INFO, { response: {}, requestMetadata: buildMetadata() });

    let service: AtxMonitoringConsoleController;
    let loggerSvc: HttpMockLoggingService;
    let stateSvc: AtxMonitoringConsoleState;
    let ioSvc: AtxLogIoService;
    let subscribeSvc: SubscriptionService;
    let actionSvc: AtxUserActionService;
    
    beforeEach(() => {
        loggerSvc = new HttpMockLoggingService();
        stateSvc = new AtxMonitoringConsoleState();
        ioSvc = new AtxLogIoService(loggerSvc);
        subscribeSvc = new SubscriptionService();
        actionSvc = new AtxUserActionService();
    });

    it('should clear all logs when the user\'s action is AtxConsoleActionType.CLEAR_LOGS', (done) => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        loggerSvc.info(buildMetadata());
        loggerSvc.error(buildMetadata());
        actionSvc.sendAction(AtxConsoleActionType.CLEAR_LOGS);
        setTimeout(()=> {
            expect(stateSvc.logs.length).toEqual(0);
            expect(loggerSvc.size).toEqual(0);
            done();
        });
    });

    it('should invoke the AtxLogIoService.exportFile() method when the user\'s action is AtxConsoleActionType.EXPORT_LOGS', (done) => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        spyOn(ioSvc, "exportFile");
        actionSvc.sendAction(AtxConsoleActionType.EXPORT_LOGS);
        setTimeout(()=> {
            expect(ioSvc.exportFile).toHaveBeenCalled();
            done();
        });
    });

    it('should invoke the AtxLogIoService.importFile() method when the user\'s action is AtxConsoleActionType.IMPORT_LOGS', (done) => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        spyOn(ioSvc, "importFile");
        actionSvc.sendAction(AtxConsoleActionType.IMPORT_LOGS, null);
        setTimeout(()=> {
            expect(ioSvc.importFile).toHaveBeenCalled();
            done();
        });
    });

    it('should set the selected log with the specified data when the user\'s action is AtxConsoleActionType.LOG_SELECT', (done) => {
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        spyOn(ioSvc, "importFile");
        actionSvc.sendAction(AtxConsoleActionType.LOG_SELECT, log1);
        setTimeout(()=> {
            expect(stateSvc.selectedLog).toBe(log1);
            done();
        });
    });

    it('should set the selected log to null when the user\'s action is AtxConsoleActionType.CLOSE_DETAILS_PANEL', (done) => {
        stateSvc.selectLog(log1);
        service = new AtxMonitoringConsoleController(loggerSvc, stateSvc, ioSvc, subscribeSvc, actionSvc);
        spyOn(ioSvc, "importFile");
        actionSvc.sendAction(AtxConsoleActionType.CLOSE_DETAILS_PANEL);
        setTimeout(()=> {
            expect(stateSvc.selectedLog).toBeNull();
            done();
        });
    });
});
