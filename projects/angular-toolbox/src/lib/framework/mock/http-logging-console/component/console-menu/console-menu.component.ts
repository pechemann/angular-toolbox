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

  protected readonly actionList: any = AtxConsoleActionType;

  @Output()
  public action: EventEmitter<AtxConsoleAction> = new EventEmitter(true);

  constructor(protected logger: HttpMockLoggingService) {}

  protected sendAction(type: AtxConsoleActionType): void {
    this.action.emit({ type: type } );
  }
}
