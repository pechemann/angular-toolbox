/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Destroyable } from "../lang";
import { Log } from "./log";

/**
 * The markup interface for Angular Toolbox log connectors. ATX log connectors are
 * controllers that apply specific processing to logs (e.g sending logs to a data base...).
 */
export interface LogConnector extends Destroyable {

  /**
   * Initializes the controller.
   * 
   * @param logList The initial log list.
   */
  init(logList: Log[]): void;

  /**
   * Sends the specified log to the controller for processing.
   * 
   * @param log The log to be sent for processing.
   */
  sendLog(log: Log): void;

  /**
   * Removes all logs from the controller.
   */
  clearLogs(): void;

  /**
   * Creates a copy of all logs in the controller.
   * The copying process depends on the controller implementation.
   */
  copyLogs(): void;
}