/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog, AtxLogConnector } from "../../../model";

/**
 * The default ATX log connector. Allows to process logs silently.
 * This can be useful for removing logs from production environments, if needed.
 */
export class AtxDefaultLogConnector implements AtxLogConnector {

    /**
     * @inheritdoc
     */
    public destroy(): void {}
    
    /**
     * @inheritdoc
     */
    public init(logList: AtxLog[]): void {}
    
    /**
     * @inheritdoc
     */
    public sendLog(log: AtxLog): void { }
    
    /**
     * @inheritdoc
     */
    public clearLogs(): void { }
    
    /**
     * @inheritdoc
     */
    public copyLogs(): void { }
}