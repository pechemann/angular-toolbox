/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogConnector, Logger } from "../../../model";
import { LogLevel } from "../../../util";
import { DefaultLogConnector } from "../connector";
import { LogBuilder } from "../util";

/**
 * A convenient immutable instance of the `DefaultLogConnector` class.
 */
export const DEFAULT_LOG_CONNECTOR: LogConnector = new DefaultLogConnector();

/**
 * The base class for all `Logger` objects.
 */
export abstract class AbstractLogger implements Logger {

  /**
   * The list of logs sent to this logger.
   */
  protected logs: Log[] = [];

  /**
   * The reference to the log connector associated with this logger.
   */
  protected logConnector: LogConnector = DEFAULT_LOG_CONNECTOR;

  /**
   * Sets a new log connector this logger.
   *  
   * @param value The reference to the new log connector associated with this logger.
   *              If `null` the logger uses the instance defined by the `DEFAULT_LOG_CONNECTOR` constant.
   */
  public setLogConnector(value: LogConnector | null): void  {
    if (this.logConnector) this.logConnector.destroy();
    this.logConnector = value || DEFAULT_LOG_CONNECTOR;
    this.logConnector.init(this.logs);
  }
  
  /**
   * Returns the reference to the log connector associated with this logger.
   * 
   * @returns The log connector associated with this logger.
   */
  public getLogConnector(): LogConnector {
    return this.logConnector;
  }

  /**
   * @inheritdoc
   */
  public getLogs(): Log[] {
    return this.logs;
  }

  /**
   * @inheritdoc
   */
  public log(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, LogLevel.LOG, metadata);
  }

  /**
   * @inheritdoc
   */
  public error(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, LogLevel.ERROR, metadata);
  }
  
  /**
   * @inheritdoc
   */
  public warn(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, LogLevel.WARNING, metadata);
  }

  /**
   * @private
   */
  private addLog(caller: string | any, msg: string, level: LogLevel, metadata?: any) {
    const log: Log = LogBuilder.build(caller, msg, level, metadata);
    this.logs.push(log);
    this.logConnector.sendLog(log);
  }
}
