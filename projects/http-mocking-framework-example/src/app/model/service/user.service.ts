/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { LogerService } from './logger.service';
import { LogLevel } from '../business/log';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private _loggerService: LogerService) {}

  private _iserId: number = -1;

  public setUserId(id: number): void {
    this._loggerService.log("User changed: " + id, LogLevel.DEBUG);
    this._iserId = id;
  }
  
  public getUserId(): number {
    return this._iserId;
  }
}
