/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { EventEmitter, Injectable } from '@angular/core';
import { Log, LogLevel } from '../business/log';

@Injectable({
  providedIn: "root"
})
export class LogerService {

  public readonly onLog: EventEmitter<Log> = new EventEmitter<Log>()
  
  public log(message: string, level: LogLevel): void {
    const log: Log = {
      message: message,
      timestamp: Date.now(),
      level: level
    };
    this.onLog.emit(log);
  }
}
