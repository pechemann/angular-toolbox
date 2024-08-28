/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log } from '../../../../../model';

/**
 * @private
 * The base class for all components that display logs information in the ATX monitoring console.
 */
export class AtxLogRendererBase {

  /**
   * @private
   */
  protected currLog: Log | null = null;

  /**
   * @private
   * Sets the log for which to render information.
   */
  public set log(value: Log | null) {
    this.currLog = value;
  }

  /**
   * @private
   * Gets the log for which to render information.
   */
  public get log(): Log | null {
    return this.currLog;
  }
}
