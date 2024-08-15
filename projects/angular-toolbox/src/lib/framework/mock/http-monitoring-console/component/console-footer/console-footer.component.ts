/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { SizeUtil } from '../../util/size.util';

@Component({
  selector: 'atx-console-footer',
  standalone: true,
  imports: [],
  templateUrl: './console-footer.component.html',
  styleUrl: './console-footer.component.scss'
})
export class AtxConsoleFooterComponent {

  protected size: string = "0 B";

  @Input()
  public set cumulativeSize(value: number) {
    this.size = SizeUtil.sizeToString(value);
  }

  @Input()
  public numLogs: number = 0;
}
