/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HttpMockLoggingService, Log, SubscriptionService } from '../../../../../model';
import { HttpLoggingConsoleLogConnector } from '../../connector/http-logging-console-log-connector';
import { IdentifiableComponent } from '../../../../../core';
import { LogDetailsComponent } from '../log-details/log-details.component';

const SLASH: string = "/";

@Component({
  selector: 'atx-http-logging-console',
  standalone: true,
  imports: [
    LogDetailsComponent
  ],
  templateUrl: './http-logging-console.component.html',
  styleUrl: './http-logging-console.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpLoggingConsoleComponent extends IdentifiableComponent implements OnDestroy {

  protected connector: HttpLoggingConsoleLogConnector;
  protected selectedLog: Log | null = null;

  constructor(protected logger: HttpMockLoggingService,
              private _cdr: ChangeDetectorRef,
              private _subscribe: SubscriptionService) {
    super();
    const connector: HttpLoggingConsoleLogConnector = new HttpLoggingConsoleLogConnector();
    this.connector = connector;
    logger.setLogConnector(connector);
    this._subscribe.register(this,
      connector.change.subscribe(()=> _cdr.detectChanges())
    );
  }

  public ngOnDestroy(): void {
    this._subscribe.clearAll(this);
  }
  
  protected logSelect(log: Log): void {
    this.selectedLog = log;
  }

  protected getResource(log: Log): string {
    const url: string = log.metadata.request.url;
    return url.substring(url.lastIndexOf(SLASH) + 1);
  }
  
  protected getSize(log: Log): string {
    const body: any = log.metadata.response.body;
    let size: number = 0;
    if (body) {
      const blob: Blob = new Blob(log.metadata.response.body);
      size = blob.size;
    }
    return size + " B";
  }
}
