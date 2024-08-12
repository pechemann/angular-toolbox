/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogConnector } from "../../../model";

/**
 * The default ATX log connector. Allows to process logs silently.
 * This can be useful for removing logs from production environments, if needed.
 */
export class DefaultLogConnector implements LogConnector {

    /**
     * @inheritdoc
     */
    public destroy(): void {}
    
    /**
     * @inheritdoc
     */
    public init(logList: Log[]): void {}
    
    /**
     * @inheritdoc
     */
    public sendLog(log: Log): void { }
    
    /**
     * @inheritdoc
     */
    public clearLogs(): void { }
    
    /**
     * @inheritdoc
     */
    public copyLogs(): void { }
}