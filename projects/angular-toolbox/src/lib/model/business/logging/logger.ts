/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */
import { Log } from "./log";

/**
 * The base interface of all logging services in the ATX logging framework.
 */
export interface Logger {

    /**
     * Returns the list of logs processed by this logging service.
     */
    getLogs(): Log[];

    /**
     * Sends a log message to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optionale metadata associated with this log.
     */
    log(caller: string | any, message: string, metadata?: any): void;

    /**
     * Sends an error log to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optionale metadata associated with this log.
     */
    error(caller: string | any, message: string, metadata?: any): void;

    /**
     * Sends an warning log to the service.
     * 
     * @param caller The reference to the caller that sends the log.
     * @param message The log message.
     * @param metadata Optionale metadata associated with this log.
     */
    warn(caller: string | any, message: string, metadata?: any): void;
}