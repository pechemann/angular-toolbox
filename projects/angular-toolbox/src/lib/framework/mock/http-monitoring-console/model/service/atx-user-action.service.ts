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

/**
 * @private
 * The service responsible for sending user's actions to the controller.
 */
@Injectable()
export class AtxUserActionService {

  /**
   * @private
   * An event emitter that triggers event representing user's actions.
   */
  @Output()
  public readonly action: EventEmitter<AtxConsoleAction> = new EventEmitter(true);
  
  /**
   * @private
   * Sends a user's actions to the system.
   * 
   * @param type The type of action to send.
   * @param data Optional data associated with the user's actions.
   */
  public sendAction(type: AtxConsoleActionType, data: any = null): void {
    this.action.emit( { type: type, data: data } );
  }
}