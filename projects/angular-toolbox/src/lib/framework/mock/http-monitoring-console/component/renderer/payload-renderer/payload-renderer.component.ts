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
export class AtxPayloadRendererComponent {

  protected json: any = null;
  protected formData: any | null = null;
  protected queryParams: any[] | null = null;

  @Input()
  public set log (value: Log | null) {
    const request: HttpRequest<any> = value?.metadata.request;
    const params: HttpParams = request.params;
    const paramsKeys: string[] = params.keys();
    const body: any = request.body;
    this.json = null;
    this.queryParams = this.formData = this.json = null;
    if (paramsKeys.length > 0) {
      this.queryParams = [];
      paramsKeys.forEach(key=> this.queryParams?.push( { key: key, value: params.get(key) } ));
    }
    if (body) {
      if (body instanceof FormData) {
        this.formData = Array.from(body);
      } else {
        this.json = JSON.parse(body);
      }
    }
    this._cdr.detectChanges();
  }

  constructor(private _cdr: ChangeDetectorRef) {}
}
