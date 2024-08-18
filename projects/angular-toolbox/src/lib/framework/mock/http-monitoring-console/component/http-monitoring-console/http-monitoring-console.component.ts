/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HttpMockLoggingService, Log, SubscriptionService, LogLevel } from '../../../../../model';
import { Uuid } from '../../../../../util';
import { HttpMonitoringConsoleLogConnector } from '../../connector/http-monitoring-console-log-connector';
import { IdentifiableComponent } from '../../../../../core';
import { AtxRequestDetailsComponent } from '../request-details/request-details.component';
import { SizeUtil } from '../../util/size.util';
import { AtxConsoleFooterComponent } from '../console-footer/console-footer.component';
import { AtxConsoleMenuComponent } from '../console-menu/console-menu.component';
import { AtxConsoleAction } from '../../model/business/atx-console-action';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';
import { UrlUtil } from '../../util/url.util';
import { HttpResponse } from '@angular/common/http';
import { AtxLogIoService } from '../../model/service/atx-log-io.service';
import { ATX_IS_IMPORTED_LOG } from '../../model/business/atx-is-imported-log';
import { AtxIconRendererComponent } from '../renderer/icon-renderer/icon-renderer.component';

const TPL_DASH: string = "---";
const PREFETCH: string = "prefetch";
const MS_SUFIX: string = " ms";

@Component({
  selector: 'atx-http-monitoring-console',
  standalone: true,
  imports: [
    AtxRequestDetailsComponent,
    AtxConsoleFooterComponent,
    AtxConsoleMenuComponent,
    AtxIconRendererComponent
  ],
  providers: [
    AtxLogIoService
  ],
  templateUrl: './http-monitoring-console.component.html',
  styleUrl: './http-monitoring-console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxMonitoringConsoleComponent extends IdentifiableComponent implements OnDestroy {

  protected connector: HttpMonitoringConsoleLogConnector;
  protected selectedLog: Log | null = null;
  protected cumulativeSize: number = 0;
  protected logs: Log[] = [];

  constructor(protected logger: HttpMockLoggingService,
              private _cdr: ChangeDetectorRef,
              private _subscribe: SubscriptionService,
              private _ioSvc: AtxLogIoService) {
    super();
    const connector: HttpMonitoringConsoleLogConnector = new HttpMonitoringConsoleLogConnector();
    this.connector = connector;
    logger.setLogConnector(connector);
    this._subscribe.register(this, connector.change.subscribe((log: Log)=> this.addLog(log)));
  }

  public ngOnDestroy(): void {
    this._subscribe.clearAll(this);
  }
  
  protected logSelect(log: Log | null): void {
    this.selectedLog = log;
  }

  protected getResourceName(log: Log): string {
    return UrlUtil.getResourceName(log);
  }
  
  protected getResourcePath(log: Log): string {
    return UrlUtil.getResourcePath(log);
  }
  
  protected getSize(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) {
      const size: number = SizeUtil.getSize(response.body);
      return SizeUtil.sizeToString(size);
    }
    return TPL_DASH;
  }

  protected getStatus(log: Log): string | number { const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status;
    return PREFETCH;
  }

  protected getTime(log: Log): string {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return log.metadata.requestMetadata.duration + MS_SUFIX;
    return TPL_DASH;
  }

  protected isError(log: Log): boolean {
    const response: HttpResponse<any> | null = log.metadata.response;
    if (response) return response.status >= 400;
    return false;
  }

  protected isImported(log: Log): boolean {
    return log.metadata.request?.context.get(ATX_IS_IMPORTED_LOG);
  }

  protected checkFilters(log: Log): boolean {
    return true;
  }

  protected userAction(action: AtxConsoleAction): void {
    switch(action.type) {
      case AtxConsoleActionType.CLEAR_LOGS : this.clearLogs(); break;
      case AtxConsoleActionType.EXPORT_LOGS: this.exportLogs(); break;
      case AtxConsoleActionType.IMPORT_LOGS: this.importLogs(); break;
    }
  }

  private addLog(log: Log): void {
    if (log.level !== LogLevel.CONFIG) {
      const size: number = SizeUtil.getSize(log.metadata.response.body);
      const id: Uuid = log.metadata.requestMetadata.id;
      this.cumulativeSize += size;
      const idx = this.logs.findIndex(prefetch => prefetch.metadata.requestMetadata.id === id);
      idx > -1 ? this.logs.splice(idx, 1, log) : this.logs.push(log);
      if (this.selectedLog?.metadata.requestMetadata.id === id) this.selectedLog = log;
    } else this.logs.push(log);
    this._cdr.detectChanges();
  }
  
  private clearLogs(): void {
    this.logger.clearLogs();
    this.logSelect(null);
    this.cumulativeSize = this.logs.length = 0;
  }

  private exportLogs(): void {
    this._ioSvc.exportFile(this.logs);
  }

  private importLogs(): void {
    this._ioSvc.importFile();
  }
}
