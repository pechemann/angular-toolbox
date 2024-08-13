/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { HttpMockLoggingService } from '../../../../../model';
import { AtxConsoleAction } from '../../model/business/atx-console-action';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';

@Component({
  selector: 'atx-console-menu',
  standalone: true,
  imports: [],
  templateUrl: './console-menu.component.html',
  styleUrl: './console-menu.component.scss'
})
export class AtxConsoleMenuComponent {

  @Output()
  public action: EventEmitter<AtxConsoleAction> = new EventEmitter(true);

  constructor(protected logger: HttpMockLoggingService) {}

  protected clearLogs(): void {
    this.action.emit({ type: AtxConsoleActionType.CLEAR_LOGS} );
  }
}
