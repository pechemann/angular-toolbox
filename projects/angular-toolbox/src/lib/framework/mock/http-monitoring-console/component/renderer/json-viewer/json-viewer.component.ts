/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AtxJsonViewerPanelComponent } from '../json-viewer-panel/json-viewer-panel.component';
import { AtxConsoleJson } from '../../../model/business/atx-console-json';
import { DataUtil } from '../../../util/data.util';

/**
 * @private
 * The component that renders JSON data in the ATX monitoring console.
 */
@Component({
    selector: 'atx-json-viewer',
    imports: [
        AtxJsonViewerPanelComponent
    ],
    templateUrl: './json-viewer.component.html',
    styleUrl: './json-viewer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxJsonViewerComponent {

  /**
   * @private
   */
  protected parsedData: AtxConsoleJson | null = null;

  /**
   * @private
   * Sets the data to be rendererd whithin this component.
   */
  @Input()
  public set data(value: any) {
    if (!value) {
      this.parsedData = null;
      return;
    }
    this.parsedData = DataUtil.parseJson(value);
  }
}
