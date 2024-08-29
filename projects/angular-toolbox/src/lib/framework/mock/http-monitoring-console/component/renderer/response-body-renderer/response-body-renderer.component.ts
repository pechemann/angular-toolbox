/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';
import { DataUtil } from '../../../util/data.util';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { SafeHtmlPipe } from '../../../../../../pipe';
import { HttpResponse } from '@angular/common/http';
import { HttpMockLoggingMetadata, Log } from 'projects/angular-toolbox/src/public-api';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

/**
 * @private
 * The component that displays HTTP response data in the ATX monitoring console.
 */
@Component({
  selector: 'atx-response-body-renderer',
  standalone: true,
  imports: [
    AtxJsonViewerComponent,
    SafeHtmlPipe
  ],
  templateUrl: './response-body-renderer.component.html',
  styleUrl: './response-body-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxResponseBodyRendererComponent extends AtxLogRendererBase {

  /**
   * @private
   */
  protected text: string | null = null;
  
  /**
   * @private
   */
  protected body: any = null;
  
  /**
   * @private
   */
  protected blob: Blob | null = null;
  
  /**
   * @private
   */
  protected arrayBuffer: ArrayBuffer | null = null;
  
  /**
   * @private
   */
  @Input()
  public override set log(value: Log | null) {
    super.log = value;
    this.ngOnDestroy();
    if (!value) return;
    const metadata: HttpMockLoggingMetadata = value.metadata; 
    const response: HttpResponse<any> =  metadata.response;
    if (!response) return
    const body: any = response.body;
    this.body = body;
    if (!body) return;
    const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
    if (bodyType === ConsoleBodyType.TEXT) {
      this.text = body;
      return;
    }
    if (bodyType === ConsoleBodyType.JSON) {
      this.text = JSON.stringify(body);
      return;
    }
    if (bodyType === ConsoleBodyType.BLOB) {
      this.blob = body;
      return;
    }
    if (bodyType === ConsoleBodyType.ARRAY_BUFFER) this.arrayBuffer = body;
  }
  
  /**
   * @private
   */
  public ngOnDestroy(): void {
    this.text = this.body = this.blob = this.arrayBuffer = null;
  }
}
