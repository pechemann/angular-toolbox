/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log, LogLevel } from "../../../model";

/**
 * The default implementation of the `Log` interface.
 */
export class LogImpl implements Log {

    /**
     * @inheritdoc
     */
    public readonly caller: string;
    
    /**
     * @inheritdoc
     */
    public readonly message: string;

    /**
     * @inheritdoc
     */
    public readonly level: LogLevel;
    
    /**
     * @inheritdoc
     */
    public readonly timestamp: number;
    
    /**
     * @inheritdoc
     */
    public readonly metadata: any;

    /**
     * Creates a new `LogImpl` instance.
     * 
     * @param caller Ahuman readable reference for the invoker associated with this log.
     * @param message The message associated with this log.
     * @param level The criticality level of this log.
     * @param metadata Optional metada associated with this log.
     */
    constructor(caller: string, message: string, level: LogLevel, metadata?: any) {
        this.caller = caller;
        this.message = message;
        this.level = level;
        this.metadata = metadata;
        this.timestamp = Date.now();
    }
}