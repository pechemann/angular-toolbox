/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog, AtxLogConnector, AtxLogger } from "../../../model";
import { AtxLogLevel } from "../../../util";
import { AtxDefaultLogConnector } from "../connector";
import { AtxLogBuilder } from "../util";

/**
 * A convenient immutable instance of the `AtxDefaultLogConnector` class.
 */
export const DEFAULT_LOG_CONNECTOR: AtxLogConnector = new AtxDefaultLogConnector();

/**
 * The base class for all `AtxLogger` objects.
 */
export abstract class AtxAbstractLogger implements AtxLogger {

  /**
   * The list of logs sent to this logger.
   */
  protected logs: AtxLog[] = [];

  /**
   * The reference to the log connector associated with this logger.
   */
  protected logConnector: AtxLogConnector = DEFAULT_LOG_CONNECTOR;

  /**
   * Sets a new log connector this logger.
   *  
   * @param value The reference to the new log connector associated with this logger.
   *              If `null` the logger uses the instance defined by the `DEFAULT_LOG_CONNECTOR` constant.
   */
  public setLogConnector(value: AtxLogConnector | null): void  {
    if (this.logConnector) this.logConnector.destroy();
    this.logConnector = value || DEFAULT_LOG_CONNECTOR;
    this.logConnector.init(this.logs);
  }
  
  /**
   * Returns the reference to the log connector associated with this logger.
   * 
   * @returns The log connector associated with this logger.
   */
  public getLogConnector(): AtxLogConnector {
    return this.logConnector;
  }

  /**
   * @inheritdoc
   */
  public getLogs(): AtxLog[] {
    return this.logs;
  }

  /**
   * @inheritdoc
   */
  public log(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, AtxLogLevel.LOG, metadata);
  }

  /**
   * @inheritdoc
   */
  public error(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, AtxLogLevel.ERROR, metadata);
  }
  
  /**
   * @inheritdoc
   */
  public warn(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, AtxLogLevel.WARNING, metadata);
  }

  /**
   * @private
   */
  private addLog(caller: string | any, msg: string, level: AtxLogLevel, metadata?: any) {
    const log: AtxLog = AtxLogBuilder.build(caller, msg, level, metadata);
    this.logs.push(log);
    this.logConnector.sendLog(log);
  }
}
