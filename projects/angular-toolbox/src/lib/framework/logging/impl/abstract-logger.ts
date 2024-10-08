/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogConnector, Logger, TransactionalLogger, LogLevel } from "../../../model";
import { DefaultLogConnector } from "../connector";
import { LogBuilder } from "../util";

/**
 * A convenient immutable instance of the `DefaultLogConnector` class.
 */
export const DEFAULT_LOG_CONNECTOR: LogConnector = new DefaultLogConnector();

/**
 * The base class for all `Logger` objects.
 */
export abstract class AbstractLogger implements Logger, TransactionalLogger {

  /**
   * @inheritdoc
   */
  public minLogLevel: LogLevel = LogLevel.INFO;

  /**
   * The list of logs sent to this logger.
   */
  protected logs: Log[] = [];

  /**
   * The reference to the log connector associated with this logger.
   */
  protected logConnector: LogConnector = DEFAULT_LOG_CONNECTOR;

  /**
   * @inheritdoc
   */
  public setLogConnector(value: LogConnector | null): void  {
    this.logConnector = value || DEFAULT_LOG_CONNECTOR;
    this.logConnector.init(this.logs);
  }
  
  /**
   * @inheritdoc
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
  public info(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, LogLevel.INFO, metadata);
  }

  /**
   * @inheritdoc
   */
  public config(caller: string | any, msg: string, metadata?: any): void {
    this.addLog(caller, msg, LogLevel.CONFIG, metadata);
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
   * @inheritdoc
   */
  public destroy(): void {
    this.logConnector = null as any;
    this.clearLogs();
  }

  /**
   * @inheritdoc
   */
  public clearLogs(): void {
    this.logs.length = 0;
  }

  /**
   * @private
   */
  private addLog(caller: string | any, msg: string, level: LogLevel, metadata?: any): void {
    if (level < this.minLogLevel) return;
    const log: Log = LogBuilder.build(caller, msg, level, metadata);
    this.logs.push(log);
    this.logConnector.sendLog(log);
  }
}
