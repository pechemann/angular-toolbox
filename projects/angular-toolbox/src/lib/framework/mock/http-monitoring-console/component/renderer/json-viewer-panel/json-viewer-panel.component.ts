/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtxConsoleJson } from '../../../model/business/atx-console-json';

@Component({
  selector: 'atx-json-viewer-panel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './json-viewer-panel.component.html',
  styleUrl: './json-viewer-panel.component.scss'
})
export class AtxJsonViewerPanelComponent {

  @Input()
  public data: AtxConsoleJson | null = null;
}
