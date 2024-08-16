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
  selector: 'atx-response-preview-renderer',
  standalone: true,
  imports: [
    AtxJsonViewerComponent,
    SafeHtmlPipe
  ],
  templateUrl: './response-preview-renderer.component.html',
  styleUrl: './response-preview-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxResponsePreviewRendererComponent {

  protected json: any = null;
  protected text: string | null = null;
  protected body: any = null;

  @Input()
  public set data (value: any) {
    this.body = value;
    this.json = this.text = null;
    if (value) {
      const bodyType: ConsoleBodyType = DataUtil.getBodyType(value);
      if (bodyType === ConsoleBodyType.TEXT) this.text = value;
      else if (bodyType === ConsoleBodyType.JSON) this.json = value;
    }
    this._cdr.detectChanges();
  }

  constructor(private _cdr: ChangeDetectorRef) {}
}
