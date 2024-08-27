/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpMockLoggingMetadata, HttpMockRequestMetadata, Log } from '../../../../../model';
import { NgStyle } from '@angular/common';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { AtxJsonViewerComponent } from '../renderer/json-viewer/json-viewer.component';
import { AtxPayloadRendererComponent } from '../renderer/payload-renderer/payload-renderer.component';
import { AtxTimingRendererComponent } from '../renderer/timing-renderer/timing-renderer.component';
import { AtxResponsePreviewRendererComponent } from '../renderer/response-preview-renderer/response-preview-renderer.component';
import { AtxResponseBodyRendererComponent } from '../renderer/response-body-renderer/response-body-renderer.component';
import { AtxUserActionService } from '../../model/service/atx-user-action.service';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';

@Component({
  selector: 'atx-monitoring-console-details',
  standalone: true,
  imports: [
    NgStyle,
    AtxJsonViewerComponent,
    AtxPayloadRendererComponent,
    AtxTimingRendererComponent,
    AtxResponsePreviewRendererComponent,
    AtxResponseBodyRendererComponent
  ],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxRequestDetailsComponent {

  protected currLog: Log | null = null;
  protected hasPayload: boolean = false;
  protected request!: HttpRequest<any>;
  protected response!: HttpResponse<any>;
  protected requestMetadata!: HttpMockRequestMetadata;

  @Input()
  public set log(value: Log | null) {
    this.currLog = value;
    if (value) {
      const metadata: HttpMockLoggingMetadata = value.metadata; 
      const request: HttpRequest<any> = metadata.request; 
      this.request = request;
      this.response = metadata.response;
      this.requestMetadata = metadata.requestMetadata;
      this.checkPayload(request);
      this._cdr.detectChanges();
      return;
    }
    this.hasPayload = false;
    this.request = null as any;
    this.response = null as any;
    this.requestMetadata = null as any;
    this._cdr.detectChanges();
  }
  
  public get log(): Log | null {
    return this.currLog;
  }

  protected readonly actionType: any = AtxConsoleActionType;
  protected currSection: number = 0;

  constructor(protected action: AtxUserActionService,
              private _cdr: ChangeDetectorRef) {}

  protected changeSection(idx: number): void {
    this.currSection = idx;
  }

  private checkPayload(request: HttpRequest<any>): void {
    const hasBody: boolean = (request.body !== null && request.body !== undefined);
    this.hasPayload = (request.params.keys().length > 0 || hasBody);
  }
}
