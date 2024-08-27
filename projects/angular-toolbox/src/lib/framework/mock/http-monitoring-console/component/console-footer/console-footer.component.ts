/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { AtxMonitoringConsoleState } from '../../model/service/atx-monitoring-console.state';

/**
 * @private
 * Represents the footer element of the ATX monitoring console.
 */
@Component({
  selector: 'atx-console-footer',
  standalone: true,
  templateUrl: './console-footer.component.html',
  styleUrl: './console-footer.component.scss'
})
export class AtxConsoleFooterComponent {

  /**
   * @private
   */
  constructor(protected state: AtxMonitoringConsoleState) {}
}
