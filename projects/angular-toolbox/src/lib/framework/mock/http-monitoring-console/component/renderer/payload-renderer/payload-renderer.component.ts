/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { Log } from '../../../../../../model';
import { HttpParams, HttpRequest } from '@angular/common/http';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';

@Component({
  selector: 'atx-payload-renderer',
  standalone: true,
  imports: [
    AtxJsonViewerComponent
  ],
  templateUrl: './payload-renderer.component.html',
  styleUrl: './payload-renderer.component.scss'
})
export class AtxPayloadRendererComponent {

  protected json: any = null;
  protected queryParams: any[] | null = null;

  @Input()
  public set log (value: Log | null) {
    const request: HttpRequest<any> = value?.metadata.request;
    const params: HttpParams = request.params;
    const paramsKeys: string[] = params.keys();
    this.json = null;
    this.queryParams = null;
    if (paramsKeys.length > 0) {
      this.queryParams = [];
      paramsKeys.forEach(key=> this.queryParams?.push( { key: key, value: params.get(key) } ));
    }
    if (request.body !== null) {
      //TODO: check all possible types:
      this.json = JSON.parse(request.body);
    }
  }
}
