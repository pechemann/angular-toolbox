/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpMockLoggingMetadata, Log } from '../../../../../model';
import { HttpRequest } from '@angular/common/http';
import { AtxPayloadRendererComponent } from '../renderer/payload-renderer/payload-renderer.component';
import { AtxTimingRendererComponent } from '../renderer/timing-renderer/timing-renderer.component';
import { AtxResponsePreviewRendererComponent } from '../renderer/response-preview-renderer/response-preview-renderer.component';
import { AtxResponseBodyRendererComponent } from '../renderer/response-body-renderer/response-body-renderer.component';
import { AtxUserActionService } from '../../model/service/atx-user-action.service';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';
import { AtxRequesInfoComponent } from '../renderer/request-info-renderer/request-info-renderer.component';
import { AtxLogRendererBase } from '../abstract/log-renderer-base';

/**
 * @private
 * The component that layouts all the logs details in the ATX monitoring console.
 */
@Component({
    selector: 'atx-monitoring-console-details',
    imports: [
        AtxPayloadRendererComponent,
        AtxTimingRendererComponent,
        AtxResponsePreviewRendererComponent,
        AtxResponseBodyRendererComponent,
        AtxRequesInfoComponent
    ],
    templateUrl: './request-details.component.html',
    styleUrl: './request-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxRequestDetailsComponent extends AtxLogRendererBase {

  /**
   * @private
   */
  protected hasPayload: boolean = false;
  
  /**
   * @private
   */
  protected readonly actionType: any = AtxConsoleActionType;
  
  /**
   * @private
   */
  protected currSection: number = 0;

  /**
   * @private
   * Gest or sets the log for which to display details.
   */
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    if (value) {
      const metadata: HttpMockLoggingMetadata = value.metadata; 
      const request: HttpRequest<any> = metadata.request;
      this.checkPayload(request);
      this._cdr.detectChanges();
      return;
    }
    this.hasPayload = false;
    this._cdr.detectChanges();
  }

  /**
   * @private
   */
  constructor(protected action: AtxUserActionService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  /**
   * @private
   */
  protected changeSection(idx: number): void {
    this.currSection = idx;
  }

  /**
   * @private
   */
  private checkPayload(request: HttpRequest<any>): void {
    const hasBody: boolean = (request.body !== null && request.body !== undefined);
    this.hasPayload = (request.params.keys().length > 0 || hasBody);
  }
}
