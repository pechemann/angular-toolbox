/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { AtxJsonViewerComponent } from '../json-viewer/json-viewer.component';
import { DataUtil } from '../../../util/data.util';
import { ConsoleBodyType } from '../../../util/console-body-type';
import { SafeHtmlPipe } from '../../../../../../pipe';

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
export class AtxResponseBodyRendererComponent {

  protected text: string | null = null;
  protected body: any = null;
  protected blob: Blob | null = null;
  protected arrayBuffer: ArrayBuffer | null = null;
  

  @Input()
  public set data (value: any) {
    this.body = value;
    this.text = this.blob = this.arrayBuffer = null;
    if (value) {
      const bodyType: ConsoleBodyType = DataUtil.getBodyType(value);
      if (bodyType === ConsoleBodyType.TEXT) this.text = value;
      else if (bodyType === ConsoleBodyType.JSON || bodyType === ConsoleBodyType.ARRAY) this.text = JSON.stringify(value);
      else if (bodyType === ConsoleBodyType.BLOB) this.blob = value;
      else if (bodyType === ConsoleBodyType.ARRAY_BUFFER) this.arrayBuffer = value;
    }
    this._cdr.detectChanges();
  }

  constructor(private _cdr: ChangeDetectorRef) {}
}
