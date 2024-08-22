/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventEmitter, Injectable, Output } from "@angular/core";
import { AtxConsoleAction } from "../business/atx-console-action";
import { AtxConsoleActionType } from "../business/atx-console-action-type";

@Injectable()
export class AtxUserActionService {

  @Output()
  public readonly action: EventEmitter<AtxConsoleAction> = new EventEmitter(true);
  
  public sendAction(type: AtxConsoleActionType, data: any = null): void {
    this.action.emit( { type: type, data: data } );
  }
}