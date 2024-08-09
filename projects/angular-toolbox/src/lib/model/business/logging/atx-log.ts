/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxLogLevel } from "../../../util";

/**
 * Represents a log in the Angular Toolbox framework.
 */
export interface AtxLog {

    /**
     * Provides a human readable reference for the invoker associated with this log.
     */
    readonly caller: string;

    /**
     * The message associated with this log.
     */
    readonly message: string;

    /**
     * The criticality level of this log.
     */
    readonly level: AtxLogLevel;

    /**
     * The timestamp at which the log has been created.
     */
    readonly timestamp: number;

    /**
     * Optional metada associated with this log.
     * Metadata are typically set by Developer to provide custom objects representations.
     */
    readonly metadata?: any;
}