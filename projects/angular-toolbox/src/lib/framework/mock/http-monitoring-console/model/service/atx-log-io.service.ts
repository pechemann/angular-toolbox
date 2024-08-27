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
import { formatDate } from "@angular/common";
import { HMFLBuilder } from "../../util/io/hmfl-builder";

/**
 * @private
 */
const BLOB_TYPE: any = { type: 'application/json' };

/**
 * @private
 */
const UTF8: any = "UTF-8";

/**
 * @private
 * The service responsible for exporting and importing `hmfl` log files.
 */
@Injectable()
export class AtxLogIoService {

  /**
   * @private
   */
  constructor(private _logger: HttpMockLoggingService) {}

  /**
   * @private
   * Exports the specified logs into a hmfl file.
   * 
   * @param logs The logs to exports.
   */
  public exportFile(logs: Log[]): void {
    const logDtoList: AtxHttpLogDto[] = [];
    let cursor: number = logs.length - 1;
    for (; cursor >= 0; cursor--) {
      const log: Log = logs[cursor];
      if (log.level !== LogLevel.CONFIG) logDtoList.push(LogConverter.logToDto(log));
    }
    const exportData: HMFL = HMFLBuilder.build(logDtoList);
    const a: HTMLAnchorElement = document.createElement("a");
    const file: Blob = new Blob([JSON.stringify(exportData)], BLOB_TYPE);
    const timeFmt: string = formatDate(exportData.timestamp, "MM/dd/yy-hh:mm-a", "en-US");
    a.href = URL.createObjectURL(file);
    a.download = `logs-${timeFmt}.hmfl`;
    a.click();
  }

  /**
   * @private
   * Imports the logs loaded through the specified `FileList` object.
   * 
   * @param fileList The logs to import.
   */
  public importFile(fileList: FileList): void {
    const logger: HttpMockLoggingService = this._logger;
    const files: File = fileList[0];
    const killReader: Function = this.killReader;
    if (files) {
      const reader: FileReader = new FileReader();
      reader.readAsText(files, UTF8);
      reader.onload = ()=> {
        const result: string = reader.result as any;
        const resultLogData: HMFL = JSON.parse(result);
        const logs: AtxHttpLogDto[] = resultLogData.logs;
        let cursor: number = logs.length - 1;
        for (; cursor >= 0; cursor--) {
          const log: Log = LogConverter.dtoToLog(logs[cursor]);
          const metadata: HttpMockLoggingMetadata = log.metadata;
          const level: LogLevel = log.level;
          if (level === LogLevel.INFO) logger.info(metadata);
          else if (level === LogLevel.ERROR) logger.error(metadata);
        };
        killReader(reader);
      }
      reader.onerror = (e)=> {
        killReader(reader);
        console.log(e)
      }
    }
  }

  /**
   * @private
   */
  private killReader(reader: FileReader): void {
    reader.onload = null;
    reader.onerror = null;
  }
}