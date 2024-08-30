/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpMockLoggingMetadata, HttpMockRequestMetadata, Log } from '../../../../../../model';
import { DatePipe, NgStyle } from '@angular/common';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';
import { HttpResponse } from '@angular/common/http';
import { TimelineUtil } from '../../../util/timeline.util';

/**
 * @private
 * The component that displays the timeline of an HTTP response in the ATX monitoring console.
 */
@Component({
  selector: 'atx-timing-renderer',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle
  ],
  templateUrl: './timing-renderer.component.html',
  styleUrl: './timing-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxTimingRendererComponent extends AtxLogRendererBase {

  /**
   * @private
   */
  protected hasData: boolean = false;
  
  /**
   * @private
   */
  protected start: number = NaN;
  
  /**
   * @private
   */
  protected downloadStart: number = NaN;
  
  /**
   * @private
   */
  protected downloadLength: number = NaN;
  
  /**
   * @private
   */
  protected duration: number = 0;
  
  /**
   * @private
   */
  protected error: boolean = false;

  /**
   * @private
   */
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    if (!value) {
      this.hasData = this.error = false;
      this.start = this.downloadStart = this.downloadLength = NaN;
      this.duration = 0;
      return;
    }
    const metadata: HttpMockLoggingMetadata = value.metadata;
    const response: HttpResponse<any> | undefined = metadata.response;
    if (!response) return;
    const requestMetadata: HttpMockRequestMetadata = metadata.requestMetadata;
    this.error = response.status >= 400;
    this.hasData = true;
    this.start = requestMetadata.start;
    this.duration = requestMetadata.duration;
    const timelineData = TimelineUtil.getTimelineData(requestMetadata);
    this.downloadStart = timelineData.downloadStart;
    this.downloadLength = timelineData.downloadLength;
  }
}
