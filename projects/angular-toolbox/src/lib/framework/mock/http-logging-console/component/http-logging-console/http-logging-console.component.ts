/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HttpMockLoggingService, Log, SubscriptionService } from '../../../../../model';
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
    AtxConsoleMenuComponent
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
    this.cumulativeSize += size;
    return SizeUtil.sizeToString(size);
  }

  protected checkFilters(log: Log): boolean {
    return true;
  }

  protected userAction(action: AtxConsoleAction): void {
    switch(action.type) {
      case AtxConsoleActionType.CLEAR_LOGS : this.clearLogs(); break;
    }
  }

  private addLog(log: Log): void {
    this.logs.push(log);
  }
  
  private clearLogs(): void {
    this.logger.clearLogs();
    this.logSelect(null);
    this.logs.length = 0;
  }
}
