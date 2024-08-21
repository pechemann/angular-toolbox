/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */
import { LogLevel } from "./log-level.enum";
import { Log } from "./log";

/**
 * The base interface of all logging services in the ATX logging framework.
 */
export interface Logger {

    /**
     * Defines the minimum log lovel at which logs must be processed.
     */
    minLogLevel: LogLevel;
    
    /**
     * Returns the list of logs processed by this logging service.
     */
    getLogs(): Log[];

    /**
     * Sends an information log message to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optional metadata associated with this log.
     */
    info(caller: string | any, message: string, metadata?: any): void;

    /**
     * Sends a config log message to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optional metadata associated with this log.
     */
    config(caller: string | any, message: string, metadata?: any): void;

    /**
     * Sends an error log to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optional metadata associated with this log.
     */
    error(caller: string | any, message: string, metadata?: any): void;

    /**
     * Sends a warning log to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optional metadata associated with this log.
     */
    warn(caller: string | any, message: string, metadata?: any): void;
    
    /**
     * Removes all the logs that have been processed by this logger.
     */
    clearLogs(): void;
}