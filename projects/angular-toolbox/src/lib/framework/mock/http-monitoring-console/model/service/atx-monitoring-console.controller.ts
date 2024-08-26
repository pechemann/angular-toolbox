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

/**
 * @private
 * The service that manages user interactions with an `AtxMonitoringConsoleComponent` instance.
 */
@Injectable()
export class AtxMonitoringConsoleController extends IdentifiableComponent implements OnDestroy {

  /**
   * @private
   */
  protected connector: HttpMonitoringConsoleLogConnector;

  /**
   * @private
   */
  constructor(private _logger: HttpMockLoggingService,
              private _state: AtxMonitoringConsoleState,
              private _ioSvc: AtxLogIoService,
              private _subscribe: SubscriptionService,
              action: AtxUserActionService) {
    super("AtxMonitoringConsoleController");
    const connector: HttpMonitoringConsoleLogConnector = new HttpMonitoringConsoleLogConnector();
    const logs: Log[] = this._logger.getLogs();
    this.connector = connector;
    this._subscribe.register(this, connector.change.subscribe((log: Log)=> this.addLog(log)))
                    .append(action.action.subscribe((action: AtxConsoleAction)=> this.onAction(action)));
    this.connector.init(logs)
    this._state.init(logs);
    this._logger.setLogConnector(connector);
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this._subscribe.clearAll(this);
    this._logger.setLogConnector(null);
    this.connector.destroy();
    this.connector = null as any;
  }

  /**
   * @private
   */
  private clearLogs(): void {
    this._logger.clearLogs();
    this._state.clearLogs();
  }
  
  /**
   * @private
   */
  private exportLogs(): void {
    this._ioSvc.exportFile(this._state.logs);
  }
  
  /**
   * @private
   */
  private addLog(log: Log): void {
    this._state.addLog(log);
  }
  
  /**
   * @private
   */
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