/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { AtxConsoleActionType } from '../../model/business/atx-console-action-type';
import { AtxUserActionService } from '../../model/service/atx-user-action.service';

/**
 * @private
 * Represents the user's action menu element of the ATX monitoring console.
 */
@Component({
  selector: 'atx-console-menu',
  standalone: true,
  templateUrl: './console-menu.component.html',
  styleUrl: './console-menu.component.scss'
})
export class AtxConsoleMenuComponent {

  /**
   * @private
   */
  protected readonly actionType: any = AtxConsoleActionType;

  /**
   * @private
   */
  constructor(protected action: AtxUserActionService) {}

  /**
   * @private
   */
  protected onFileSelect(event: Event): void {
    this.action.sendAction(AtxConsoleActionType.IMPORT_LOGS, (event.target as HTMLInputElement).files);
  }
}
