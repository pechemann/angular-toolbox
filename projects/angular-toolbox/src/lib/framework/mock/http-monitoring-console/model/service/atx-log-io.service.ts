/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { HttpMockLoggingMetadata, HttpMockLoggingService, Log, LogLevel } from '../../../../../model';
import { LogConverter } from "../../util/io/log-converter";
import { AtxHttpLogDto } from "../business/io/atx-http-log.dto";
import { HMFL } from "../business/io/hmfl";

@Injectable()
export class AtxLogIoService {

  private readonly _converter: LogConverter;

  constructor(private _logger: HttpMockLoggingService) {
    this._converter = new LogConverter();
  }

  public exportFile(logs: Log[]): void {
    const logDtoList: AtxHttpLogDto[] = [];
    let cursor: number = logs.length - 1;
    for (; cursor >= 0; cursor--) {
      const log: Log = logs[cursor];
      if (log.level !== LogLevel.CONFIG) logDtoList.push(this._converter.logToDto(log));
    }
    const exportData: HMFL = {
      logs: logDtoList,
      timestamp: Date.now()
    };
    const a: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = "logs.hmfl";
    a.click();
  }

  public importFile(fileList: FileList): void {
    const converter: LogConverter = this._converter;
    const logger: HttpMockLoggingService = this._logger;
    const file: File = fileList[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        const result: string = reader.result as any;
        const resultLogData: HMFL = JSON.parse(result);
        const logs: AtxHttpLogDto[] = resultLogData.logs;
        let cursor: number = logs.length - 1;
        for (; cursor >= 0; cursor--) {
          const log: Log = converter.dtoToLog(logs[cursor]);
          const metadata: HttpMockLoggingMetadata = log.metadata;
          const level: LogLevel = log.level;
          if (level === LogLevel.INFO) logger.info(metadata);
          else if (level === LogLevel.ERROR) logger.error(metadata);
        };
      }
      reader.onerror = function (e) {
        console.log(e)
      }
    }
  }
}