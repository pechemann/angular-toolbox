/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable, OnDestroy } from "@angular/core";
import { HttpMockLoggingService, Log, SubscriptionService } from '../../../../../model';
import { AtxLogIoService } from "./atx-log-io.service";
import { AtxMonitoringConsoleState } from "./atx-monitoring-console.state";
import { HttpMonitoringConsoleLogConnector } from "../../connector/http-monitoring-console-log-connector";
import { IdentifiableComponent } from '../../../../../core';
import { AtxConsoleAction } from "../business/atx-console-action";
import { AtxConsoleActionType } from "../business/atx-console-action-type";
import { AtxUserActionService } from "./atx-user-action.service";

@Injectable()
export class AtxMonitoringConsoleController extends IdentifiableComponent implements OnDestroy {

  protected connector: HttpMonitoringConsoleLogConnector;

  constructor(private _logger: HttpMockLoggingService,
              private _state: AtxMonitoringConsoleState,
              private _ioSvc: AtxLogIoService,
              private _subscribe: SubscriptionService,
              action: AtxUserActionService) {
    super("AtxMonitoringConsoleController");
    const connector: HttpMonitoringConsoleLogConnector = new HttpMonitoringConsoleLogConnector();
    this.connector = connector;
    this._logger.setLogConnector(connector);
    this._subscribe.register(this, connector.change.subscribe((log: Log)=> this.addLog(log)))
                    .append(action.action.subscribe((action: AtxConsoleAction)=> this.onAction(action)));
  }

  public ngOnDestroy(): void {
    this._subscribe.clearAll(this);
  }

  private clearLogs(): void {
    this._logger.clearLogs();
    this._state.clearLogs();
  }
  
  private exportLogs(): void {
    this._ioSvc.exportFile(this._state.logs);
  }
  
  private addLog(log: Log): void {
    this._state.addLog(log);
  }
  
  private onAction(action: AtxConsoleAction): void {
    switch(action.type) {
      case AtxConsoleActionType.CLEAR_LOGS : this.clearLogs(); break;
      case AtxConsoleActionType.EXPORT_LOGS: this.exportLogs(); break;
      case AtxConsoleActionType.IMPORT_LOGS: this._ioSvc.importFile(action.data); break;
      case AtxConsoleActionType.LOG_SELECT: this._state.selectLog(action.data); break;
      case AtxConsoleActionType.CLOSE_DETAILS_PANEL: this._state.selectLog(null); break;
    }
  }
}