/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the level of an Angular Toolbox log.
 * 
 */
export enum LogLevel {

    /**
     * Indicates that the log is a basic information message.
     */
    INFO = 0,
        
    /**
     * Indicates that the log represents a config message.
     */
    CONFIG = 1,

    /**
     * Indicates that the log is a warning message.
     */
    WARNING = 2,

    /**
     * Indicates that the log message represents an error.
     */
    ERROR = 3,
    
    /**
     * A special level used by loggers to prevent logs to be processed.
     */
    OFF = 4
}