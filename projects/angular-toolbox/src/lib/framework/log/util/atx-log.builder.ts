/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLog } from "../../../model";
import { AtxLogLevel } from "../../../util";
import { AtxLogImpl } from "../impl";

/**
 * A static builder that creates new `AtxLog` objects.
 */
export class AtxLogBuilder {

    /**
     * Builds and returns a new `AtxLog` object initialized with the specified parameters.
     * 
     * @param caller The reference to the object that sends the new log.
     * @param message The message of the new log.
     * @param level The level of the new log.
     * @param metadata The optional metadata associated with the new log.
     * 
     * @returns A new `AtxLog` object
     */
    public static build(caller: string, message: string, level: AtxLogLevel = AtxLogLevel.LOG, metadata?: any): AtxLog {
        return new AtxLogImpl(caller, message, level, metadata);
    }
}