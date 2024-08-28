/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpMockRequestMetadata, Log } from '../../../../../../model';
import { DatePipe, NgStyle } from '@angular/common';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

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

  protected hasData: boolean = false;
  protected start: number = NaN;
  protected downloadStart: number = NaN;
  protected downloadLength: number = NaN;
  protected duration: number = 0;
  protected error: boolean = false;

  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    if (value) {
      const metadata: any = value.metadata;
      const requestMetadata: HttpMockRequestMetadata = metadata.requestMetadata;
      const duration: number = requestMetadata.duration;
      const stalled: number = requestMetadata.stalled;
      this.error = metadata.response.status >= 400;
      this.hasData = true;
      this.start = requestMetadata.start;
      this.duration = duration;
      if (duration === 0) {
        this.downloadStart = this.downloadLength = 0;
        return;
      }
      const downloadLength: number = Math.round(100 * (duration - stalled) / duration);
      this.downloadStart = 100 - downloadLength;
      this.downloadLength = downloadLength;
      return;
    }
    this.hasData = this.error = false;
    this.start = this.downloadStart = this.downloadLength = NaN;
    this.duration = 0;
  }
}
