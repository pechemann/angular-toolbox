/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Log } from "../../../model";
import { LogLevel } from "../../../util";
import { LogImpl } from "../impl";

/**
 * A static builder that creates new `Log` objects.
 */
export class LogBuilder {

    /**
     * Builds and returns a new `Log` object initialized with the specified parameters.
     * 
     * @param caller The reference to the object that sends the new log.
     * @param message The message of the new log.
     * @param level The level of the new log.
     * @param metadata The optional metadata associated with the new log.
     * 
     * @returns A new `Log` object
     */
    public static build(caller: string, message: string, level: LogLevel = LogLevel.INFO, metadata?: any): Log {
        return new LogImpl(caller, message, level, metadata);
    }
}