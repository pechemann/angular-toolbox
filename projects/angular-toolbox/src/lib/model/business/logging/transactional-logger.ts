/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Destroyable } from "angular-toolbox";
import { LogConnector } from "./log-connector";

/**
 * TTransactional loggers allow to create proxy via the `LogConnector` interface
 * to send logs to third-party tools.
 */
export interface TransactionalLogger extends Destroyable {

  /**
   * Sets a new log connector this transactional logger.
   *  
   * @param value The reference to the new log connector associated with this transactional logger.
   *              If `null` the logger uses the instance defined by the `DEFAULT_LOG_CONNECTOR` constant.
   */
  setLogConnector(value: LogConnector | null): void ;
  
  /**
   * Returns the reference to the log connector associated with this transactional logger.
   * 
   * @returns The log connector associated with this transactional logger.
   */
  getLogConnector(): LogConnector;
}