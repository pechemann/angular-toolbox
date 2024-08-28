/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Log } from '../../../../../../model';
import { HttpParams, HttpRequest } from '@angular/common/http';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';
import { DataUtil } from '../../../util/data.util';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { AtxLogRendererBase } from '../../abstract/log-renderer-base';

@Component({
  selector: 'atx-payload-renderer',
  standalone: true,
  imports: [
    AtxJsonViewerComponent
  ],
  templateUrl: './payload-renderer.component.html',
  styleUrl: './payload-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxPayloadRendererComponent extends AtxLogRendererBase {

  protected json: any = null;
  protected formData: any | null = null;
  protected queryParams: any[] | null = null;

  @Input()
  public override set log (value: Log | null) {
    super.log = value;
    const request: HttpRequest<any> = value?.metadata.request;
    const params: HttpParams = request.params;
    const paramsKeys: string[] = params.keys();
    const body: any = request.body;
    const bodyType: ConsoleBodyType = DataUtil.getBodyType(body);
    this.queryParams = this.formData = this.json = null;
    if (paramsKeys.length > 0) {
      this.queryParams = [];
      paramsKeys.forEach(key=> this.queryParams?.push( { key: key, value: params.get(key) } ));
    }
    if (bodyType === ConsoleBodyType.FORM_DATA) {
      this.formData = Array.from(body);
    } else if (bodyType === ConsoleBodyType.TEXT) {
      this.json = JSON.parse(body);
    }
  }
}
