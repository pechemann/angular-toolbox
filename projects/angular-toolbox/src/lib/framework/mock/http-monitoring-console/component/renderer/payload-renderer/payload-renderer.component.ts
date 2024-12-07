/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Log } from '../../../../../../model';
import { HttpParams, HttpRequest } from '@angular/common/http';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';
import { DataUtil } from '../../../util/data.util';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

/**
 * @private
 * The component that displays payload data associated with an HTTP request in the ATX monitoring console.
 */
@Component({
    selector: 'atx-payload-renderer',
    imports: [
        AtxJsonViewerComponent
    ],
    templateUrl: './payload-renderer.component.html',
    styleUrl: './payload-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxPayloadRendererComponent extends AtxLogRendererBase {

  /**
   * @private
   */
  protected json: any = null;

  /**
   * @private
   */
  protected formData: any | null = null;
  
  /**
   * @private
   */
  protected queryParams: any[] | null = null;
  
  /**
   * @private
   */
  @Input()
  public override set log (value: Log | null) {
    super.log = value;
    this.json = this.formData = this.queryParams = null;
    if(!value) return;
    const request: HttpRequest<any> = value.metadata.request;
    const params: HttpParams = request.params;
    const paramsKeys: string[] = params.keys();
    const body: any = request.body;
    const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
    if (paramsKeys.length > 0) {
      this.queryParams = [];
      paramsKeys.forEach(key=> this.queryParams?.push( { key: key, value: params.get(key) } ));
    }
    if (bodyType === ConsoleBodyType.FORM_DATA) {
      this.formData = Array.from(body);
      return;
    }
    if (bodyType === ConsoleBodyType.TEXT) {
      this.json = JSON.parse(body);
    }
  }
}
