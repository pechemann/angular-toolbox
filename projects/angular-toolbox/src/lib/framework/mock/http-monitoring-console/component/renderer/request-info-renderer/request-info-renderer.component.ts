/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpMockLoggingMetadata, Log } from '../../../../../../model';
import { NgStyle } from '@angular/common';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

/**
 * @private
 * The component that displays HTTP request info in the ATX monitoring console.
 */
@Component({
  selector: 'atx-request-info-renderer',
  standalone: true,
  imports: [
    NgStyle,
  ],
  templateUrl: './request-info-renderer.component.html',
  styleUrl: './request-info-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxRequesInfoComponent extends AtxLogRendererBase {
  
  /**
   * @private
   */
  protected request!: HttpRequest<any>;
  
  /**
   * @private
   */
  protected response!: HttpResponse<any>;

  /**
   * @private
   * Gest or sets the log for which to display general information.
   */
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    if (!value) {
      this.request = this.response = null as any;
      return;
    }
    const metadata: HttpMockLoggingMetadata = value.metadata; 
    const request: HttpRequest<any> = metadata.request; 
    this.request = request;
    this.response = metadata.response;
  }
}
