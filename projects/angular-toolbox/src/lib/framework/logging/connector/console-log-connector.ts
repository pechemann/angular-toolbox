/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogConnector } from "../../../model";
import { LogLevel } from "../../../util";

/**
 * An implementation of the `LogConnector` class that sends logs to the JavaScript
 * native `console` object.
 */
export class ConsoleLogConnector implements LogConnector {

    /**
     * @inheritdoc
     */
    public destroy(): void {}
    
    /**
     * @inheritdoc
     */
    public init(logList: Log[]): void {
        logList.forEach(log=> this.sendLog(log));
    }

    /**
     * @inheritdoc
     */
    public sendLog(log: Log): void {
        const level: LogLevel = log.level;
        if (level === LogLevel.INFO) return console.info(log);
        if (level === LogLevel.CONFIG) return console.log(log);
        if (level === LogLevel.ERROR) return console.error(log) ;
        console.warn(log);
    }

    /**
     * @inheritdoc
     */
    public clearLogs(): void {
        console.clear();
    }

    /**
     * Not supported.
     */
    public copyLogs(): void {}
}