/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable, OnDestroy } from "@angular/core";
import { HttpMockLogger } from "../../../../../framework/mock/http/logging/http-mock-logger";
import { TransactionalLogger, HttpMockLoggingMetadata, LogConnector, Log, HttpMockLoggingPrefetchMetadata } from "../../../../business";

/**
 * @private
 * The "caller" reference for all logs of the HTTP Mocking Framework.
 */
const CALLER: string = "HTTP Mocking Framework";

/**
 * @private
 * The "message" reference for all valid logs of the HTTP Mocking Framework.
 */
const RESPONSE_MESSAGE: string = "HTTP response";

/**
 * @private
 * The "message" reference for all error logs of the HTTP Mocking Framework.
 */
const ERROR_MESSAGE: string = "HTTP error";

/**
 * @private
 * The "message" reference for all prefetch logs of the HTTP Mocking Framework.
 */
const CONFIG_MESSAGE: string = "HTTP prefetch";

/**
 * @private
 * 
 * The utility service that manages the HTTP Mocking Framework logs.
 */
@Injectable({
    providedIn: 'root'
})
export class HttpMockLoggingService implements TransactionalLogger, OnDestroy {

    /**
     * Returns the number of logs currently processed by this logger.
     */
    public get size(): number {
        return this._logger.getLogs().length;
    }

    /**
     * The `HttpMockLogger` instance encapsulated by this service.
     */
    private _logger: HttpMockLogger;

    /**
     * @private
     */
    constructor() {
        this._logger = new HttpMockLogger();
    }

    /**
     * Processes information logs with the specified metadata.
     * 
     * @param metadata The metadata associated with the HTTP method to log.
     * 
     * @return The log for the specified metadata.
     */
    public info(metadata: HttpMockLoggingMetadata): Log {
        this._logger.info(CALLER, RESPONSE_MESSAGE, metadata);
        return this.getLastLog();
    }

    /**
     * Processes error logs with the specified metadata.
     * 
     * @param metadata The metadata associated with the HTTP method to log.
     * 
     * @return The log for the specified metadata.
     */
    public error(metadata: HttpMockLoggingMetadata): Log {
        this._logger.error(CALLER, ERROR_MESSAGE, metadata);
        return this.getLastLog();
    }

    /**
     * Processes a special kind of logs that are used to indicate that a HTTP operation
     * started and no response is available yet.
     * 
     * @param metadata The metadata associated with the HTTP method to log.
     */
    public prefetch(metadata: HttpMockLoggingPrefetchMetadata): void {
        this._logger.config(CALLER, CONFIG_MESSAGE, metadata);
    }

    /**
     * @inheritdoc
     */
    public clearLogs(): void {
        this._logger.clearLogs();
        this._logger.getLogConnector().clearLogs();
    }
    
    /**
     * @inheritdoc
     */
    public setLogConnector(value: LogConnector | null): void  {
        this._logger.setLogConnector(value);
    }
    
    /**
     * @inheritdoc
     */
    public getLogConnector(): LogConnector {
        return this._logger.getLogConnector();
    }
    
    /**
     * @inheritdoc
     */
    public destroy(): void {
        if (this._logger) this._logger.destroy();
        this._logger = null as any;
    }

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void {
        this.destroy();
    }

    /**
     * @inheritdoc
     */
    private getLastLog(): Log {
        const logs: Log[] = this._logger.getLogs();
        return logs[logs.length - 1];
    }
}