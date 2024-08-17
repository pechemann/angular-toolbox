/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { Log } from '../../../../../model';
import { LogConverter } from "./io/log-converter";
import { AtxHttpLogDto } from "../business/io/atx-http-log.dto";
import { HMFL } from "../business/io/hmfl";

@Injectable()
export class AtxLogIoService {

  private readonly _converter: LogConverter;

  constructor() {
    this._converter = new LogConverter();
  }

  public exportToFile(logs: Log[]): void {
    const logDtoList: AtxHttpLogDto[] = [];
    let cursor: number = logs.length - 1;
    for (; cursor >= 0; cursor--) logDtoList.push(this._converter.logToDto(logs[cursor]));
    const exportData: HMFL = {
      logs: logDtoList,
      timestamp: Date.now()
    };
    const a: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    //a.download = "logs.hmfl";
    a.download = "logs.json";
    a.click();
  }
}