/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Injectable, OnDestroy } from "@angular/core";
import { LogConnector, TransactionalLogger } from "../../../logging";
import { HttpMockLoggingMetadata } from "./http-mock-logging-metadata";
import { HttpMockLogger } from "../../../../../framework/mock/http/logging/http-mock-logger";

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
     * 
     * @param metadata 
     */
    public log(metadata?: HttpMockLoggingMetadata): void {
        this._logger.log(CALLER, RESPONSE_MESSAGE, metadata);
    }

    /**
     * @inheritdoc
     */
    public error(metadata?: HttpMockLoggingMetadata): void {
        this._logger.error(CALLER, ERROR_MESSAGE, metadata);
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
}