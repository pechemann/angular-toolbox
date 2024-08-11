/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable, OnDestroy } from "@angular/core";
import { HttpMockLogger } from "../../../../../framework/mock/http/logging/http-mock-logger";
import { TransactionalLogger, HttpMockLoggingMetadata, LogConnector, Log } from "../../../../business";

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
 * 
 * The utility service that manages the HTTP Mocking Framework logs.
 */
@Injectable({
    providedIn: 'root'
})
export class HttpMockLoggingService implements TransactionalLogger, OnDestroy {

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
    public info(metadata?: HttpMockLoggingMetadata): Log {
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
    public error(metadata?: HttpMockLoggingMetadata): Log {
        this._logger.error(CALLER, ERROR_MESSAGE, metadata);
        return this.getLastLog();
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