/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable } from "@angular/core";
import { HttpMockLoggingMetadata, HttpMockLoggingService, Log, LogLevel } from '../../../../../model';
import { LogConverter } from "./io/log-converter";
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
    for (; cursor >= 0; cursor--) logDtoList.push(this._converter.logToDto(logs[cursor]));
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

  public importFile(): void {
    const input: HTMLInputElement = document.createElement("input");
    const converter: LogConverter = this._converter;
    const logger: HttpMockLoggingService = this._logger;
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".hmfl");
    input.onchange = (event: any)=> {
      const fileList = event.target.files;
      const file: File = fileList[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          const result: string = reader.result as any;
          const resultLogData: HMFL = JSON.parse(result);
          const logs: AtxHttpLogDto[] = resultLogData.logs;
          let cursor: number = logs.length - 1;
          for (; cursor >= 0; cursor--) {
            const log: Log = converter.dtoToLog(logs[cursor]);
            const metadata: HttpMockLoggingMetadata = log.metadata;
            console.log(metadata)
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
    input.click();
  }
}