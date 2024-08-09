/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog, AtxLogConnector } from "../../../model";
import { AtxLogLevel } from "../../../util";

/**
 * An implementation of the `AtxLogConnector` class that sends logs to the JavaScript
 * native `console` object.
 */
export class AtxConsoleLogConnector implements AtxLogConnector {

    /**
     * @inheritdoc
     */
    public destroy(): void {}
    
    /**
     * @inheritdoc
     */
    public init(logList: AtxLog[]): void {
        logList.forEach(log=> this.sendLog(log));
    }

    /**
     * @inheritdoc
     */
    public sendLog(log: AtxLog): void {
        const level: AtxLogLevel = log.level;
        if (level === AtxLogLevel.LOG) return console.log(log);
        if (level === AtxLogLevel.ERROR) return console.error(log) ;
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