/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { Log } from '../../../../../model';
import { LogConverter } from "../../util/log-converter";
import { AtxHttpLogDto } from "../business/dto/atx-http-log.dto";

@Injectable()
export class AtxLogIoService {

    public exportToFile(logs: Log[]): void {
      const logDtoList: AtxHttpLogDto[] = [];
      let cursor: number = logs.length - 1;
      for(; cursor >= 0; cursor--) logDtoList.push(LogConverter.logToDto(logs[cursor]));
      const exportData = {
        logs: logDtoList,
        date: Date.now()
      };
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
      a.href = URL.createObjectURL(file);
      a.download = "logs.hmfl";
      a.click();
    }
}