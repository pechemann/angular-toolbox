/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { Log, LogLevel } from '../../../../../model';
import { Uuid } from '../../../../../util';
import { SizeUtil } from "../../util/size.util";

/**
 * @private
 * A convenient service that stores the state of an `AtxMonitoringConsoleComponent` instance.
 */
@Injectable()
export class AtxMonitoringConsoleState {

  /**
   * @private
   * Returns the `Log` object currently selected, or `null` if no log is selected.
   */
  public get selectedLog(): Log | null {
    return this._selectedLog;
  };

  /**
   * @private
   * Returns a string that represents the size of all requests stored within this service.
   * The string is in the format defined by the `SizeUtil.sizeToString()` method.
   */
  public get cumulativeSize(): string {
    return this._cumulativeSize;
  };

  /**
   * @private
   * Returns the list of logs stored within this service.
   */
  public get logs(): Log[] {
    return this._logs;
  };

  /**
   * @private
   * Returns the number of logs stored within this service.
   */
  public get numLogs(): number {
    return this._logs.length;
  };

  /**
   * @private
   */
  private _selectedLog: Log | null = null;

  /**
   * @private
   */
  private _cumulativeSize: string = SizeUtil.INITIAL_SIZE;

  /**
   * @private
   */
  private _logs: Log[] = [];

  /**
   * @private
   */
  private _size: number = 0;

  /**
   * @private
   * Initializes the service.
   * Allows to inject the logs previously collected by the `HttpMockLoggingService` singleton.
   * 
   * @param logs The list of logs that must be stored within this service.
   */
  public init(logs: Log[]): void {
    const len: number = logs.length - 1;
    let i: number = 0;
    for (; i <= len; ++i) this.addLog(logs[i]);
  }

  /**
   * @private
   * Adds the specified log to the service for storage purpose.
   * 
   * @param log The log to add to this service.
   */
  public addLog(log: Log): void {
    if (log.level !== LogLevel.CONFIG) {
      const size: number = SizeUtil.getSize(log.metadata.response.body);
      const id: Uuid = log.metadata.requestMetadata.id;
      this._size += size;
      this._cumulativeSize = SizeUtil.sizeToString(this._size);
      const idx: number = this._logs.findIndex(prefetch => prefetch.metadata.requestMetadata.id === id);
      idx > -1 ? this._logs.splice(idx, 1, log) : this._logs.push(log);
      if (this.selectedLog?.metadata.requestMetadata.id === id) this._selectedLog = log;
    } else this._logs.push(log);
  }

  /**
   * @private
   * Removes all the logs stored within this service and sets all service properties
   * to their default value.
   */
  public clearLogs(): void {
    this._selectedLog = null;
    this._size = this._logs.length = 0;
    this._cumulativeSize = SizeUtil.INITIAL_SIZE;
  }

  /**
   * @private
   * Indicates that the specified log is the currently selected log.
   * 
   * @param log The log to set as the currently selected log.
   */
  public selectLog(log: Log | null): void {
    this._selectedLog = log;
  }
}