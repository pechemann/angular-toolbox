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

@Injectable()
export class AtxMonitoringConsoleState {

  public get selectedLog(): Log | null {
    return this._selectedLog;
  };

  public get cumulativeSize(): string {
    return this._cumulativeSize;
  };

  public get logs(): Log[] {
    return this._logs;
  };

  public get numLogs(): number {
    return this._logs.length;
  };

  private _selectedLog: Log | null = null;
  private _cumulativeSize: string = "0 B";
  private _logs: Log[] = [];
  private _size: number = 0; 

  public addLog(log: Log): void {
    if (log.level !== LogLevel.CONFIG) {
      const size: number = SizeUtil.getSize(log.metadata.response.body);
      const id: Uuid = log.metadata.requestMetadata.id;
      this._size += size;
      this._cumulativeSize = SizeUtil.sizeToString(this._size);
      const idx = this._logs.findIndex(prefetch => prefetch.metadata.requestMetadata.id === id);
      idx > -1 ? this._logs.splice(idx, 1, log) : this._logs.push(log);
      if (this.selectedLog?.metadata.requestMetadata.id === id) this._selectedLog = log;
    } else this._logs.push(log);
  }

  public clearLogs(): void {
    this._selectedLog = null;
    this._size = this._logs.length = 0;
  }

  public selectLog(log: Log | null): void {
    this._selectedLog = log;
  }
}