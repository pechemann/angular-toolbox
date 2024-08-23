/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { EventEmitter } from "@angular/core";
import { Log, LogConnector, LogLevel } from "../../../../model";

/**
 * @private
 * An implementation of the `LogConnector` class that sends logs to the HTTP
 * mocking console component.
 */
export class HttpMonitoringConsoleLogConnector implements LogConnector {

    /**
     * @private
     */
    public readonly logs: Log[] = [];

    /**
     * @private
     */
    public readonly change: EventEmitter<Log> = new EventEmitter(true);

    /**
     * @private
     */
    public destroy(): void {}
    
    /**
     * @private
     */
    public init(logList: Log[]): void {
        this.logs.push(...logList);
    }

    /**
     * @private
     */
    public sendLog(log: Log): void {
        const level: LogLevel = log.level;
        if (level === LogLevel.INFO || LogLevel.ERROR) this.logs.push(log);
        this.change.emit(log);
    }

    /**
     * @private
     */
    public clearLogs(): void {
        this.logs.length = 0;
    }

    /**
     * @private
     * Not supported.
     */
    public copyLogs(): void {}
}