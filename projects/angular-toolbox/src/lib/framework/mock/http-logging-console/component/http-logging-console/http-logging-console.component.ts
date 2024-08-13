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

const SLASH: string = "/";

@Component({
  selector: 'atx-logging-console',
  standalone: true,
  imports: [
    AtxLogDetailsComponent,
    AtxConsoleFooterComponent
  ],
  templateUrl: './http-logging-console.component.html',
  styleUrl: './http-logging-console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxLoggingConsoleComponent extends IdentifiableComponent implements OnDestroy {

  protected connector: HttpLoggingConsoleLogConnector;
  protected selectedLog: Log | null = null;
  protected cumulativeSize: number = 0;

  constructor(protected logger: HttpMockLoggingService,
              cdr: ChangeDetectorRef,
              private _subscribe: SubscriptionService) {
    super();
    const connector: HttpLoggingConsoleLogConnector = new HttpLoggingConsoleLogConnector();
    this.connector = connector;
    logger.setLogConnector(connector);
    this._subscribe.register(this,
      connector.change.subscribe(()=> cdr.detectChanges())
    );
  }

  public ngOnDestroy(): void {
    this._subscribe.clearAll(this);
  }
  
  protected logSelect(log: Log | null): void {
    this.selectedLog = log;
  }

  protected clearLogs(): void {
    this.logger.clearLogs();
    this.logSelect(null);
  }

  protected getResource(log: Log): string {
    const url: string = log.metadata.request.url;
    return url.substring(url.lastIndexOf(SLASH) + 1);
  }
  
  protected getSize(log: Log): string {
    const size: number = SizeUtil.getSize(log.metadata.response.body);
    this.cumulativeSize += size;
    return SizeUtil.sizeToString(size);
  }
}
