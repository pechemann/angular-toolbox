/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HttpMockLoggingService, Log, SubscriptionService } from '../../../../../model';
import { LogLevel } from '../../../../../util';
import { HttpLoggingConsoleLogConnector } from '../../connector/http-logging-console-log-connector';
import { IdentifiableComponent } from '../../../../../core';
import { AtxLogDetailsComponent } from '../log-details/log-details.component';
import { SizeUtil } from '../../util/size.util';
import { AtxConsoleFooterComponent } from '../console-footer/console-footer.component';
import { AtxConsoleMenuComponent } from '../console-menu/console-menu.component';
import { AtxConsoleAction } from '../../model/business/atx-console-action';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';
import { UrlUtil } from '../../util/url.util';

@Component({
  selector: 'atx-logging-console',
  standalone: true,
  imports: [
    AtxLogDetailsComponent,
    AtxConsoleFooterComponent,
    AtxConsoleMenuComponent,
  ],
  templateUrl: './http-logging-console.component.html',
  styleUrl: './http-logging-console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxLoggingConsoleComponent extends IdentifiableComponent implements OnDestroy {

  protected connector: HttpLoggingConsoleLogConnector;
  protected selectedLog: Log | null = null;
  protected cumulativeSize: number = 0;
  protected logs: Log[] = [];

  constructor(protected logger: HttpMockLoggingService,
              private _cdr: ChangeDetectorRef,
              private _subscribe: SubscriptionService) {
    super();
    const connector: HttpLoggingConsoleLogConnector = new HttpLoggingConsoleLogConnector();
    this.connector = connector;
    logger.setLogConnector(connector);
    this._subscribe.register(this,
      connector.change.subscribe((log: Log)=> {
        this.addLog(log);
        _cdr.detectChanges();
      })
    );
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
    const size: number = SizeUtil.getSize(log.metadata.response.body);
    return SizeUtil.sizeToString(size);
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
    const size: number = SizeUtil.getSize(log.metadata.response.body);
    this.logs.push(log);
    this.cumulativeSize += size;
  }
  
  private clearLogs(): void {
    this.logger.clearLogs();
    this.logSelect(null);
    this.logs.length = 0;
  }

  private exportLogs(): void {
    /*const exportData = {
      logs: this.connector.logs,
      date: Date.now()
    };
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = "logs.hmfl";
    a.click();*/
  }

  private importLogs(): void {
    /*const input = document.createElement("input");
    const logger = this.logger;
    input.setAttribute("type", "file");
    input.onchange = (event: any)=> {
      const fileList = event.target.files;
      const file: File = fileList[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          const result: string = reader.result as any;
          const resultLogData = JSON.parse(result);
          console.log(resultLogData)
          resultLogData.logs.forEach((log: Log) => {
            const level = log.level;
            const metadata = log.metadata;
            if (level === LogLevel.INFO) logger.info(metadata);
            else if (level === LogLevel.ERROR) logger.error(metadata);
            else {
              // log level error
            }
          });
        }
        reader.onerror = function (e) {
          console.log(e)
        }
      }
    }
    input.click();*/
  }
}
