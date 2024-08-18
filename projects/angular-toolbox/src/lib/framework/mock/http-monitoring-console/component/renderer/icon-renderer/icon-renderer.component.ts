/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { Log } from '../../../../../../model';
import { ATX_IS_IMPORTED_LOG } from '../../../model/business/atx-is-imported-log';

@Component({
  selector: 'atx-icon-renderer',
  standalone: true,
  imports: [],
  templateUrl: './icon-renderer.component.html',
  styleUrl: './icon-renderer.component.scss'
})
export class AtxIconRendererComponent {

  @Input()
  public set data(log: Log) {
    this.log = log;
    this.isImported = log.metadata.request?.context.get(ATX_IS_IMPORTED_LOG);
  }

  protected isImported: boolean = false;
  protected log!: Log;
}
