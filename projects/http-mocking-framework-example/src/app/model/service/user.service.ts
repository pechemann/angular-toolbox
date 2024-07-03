/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from '@angular/core';
import { LogerService } from './logger.service';
import { LogLevel } from '../business/log';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private loggerService: LogerService) {}

  private currUserId: number = -1;

  public setUserId(id: number): void {
    this.loggerService.log("User changed: " + id, LogLevel.DEBUG);
    this.currUserId = id;
  }
  
  public getUserId(): number {
    return this.currUserId;
  }
}
