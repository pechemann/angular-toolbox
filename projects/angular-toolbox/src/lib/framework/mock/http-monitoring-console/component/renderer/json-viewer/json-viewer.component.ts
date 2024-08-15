/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { AtxJsonViewerPanelComponent } from '../json-viewer-panel/json-viewer-panel.component';
import { AtxConsoleJson } from '../../../model/business/atx-console-json';
import { DataUtil } from '../../../util/data.util';

@Component({
  selector: 'atx-json-viewer',
  standalone: true,
  imports: [
    AtxJsonViewerPanelComponent
  ],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.scss'
})
export class AtxJsonViewerComponent {

  protected parsedData: AtxConsoleJson | null = null;

  @Input()
  public set data(value: any) {
    if (!value) {
      this.parsedData = null;
      return;
    }
    this.parsedData = DataUtil.parseJson(value);
  }
}
