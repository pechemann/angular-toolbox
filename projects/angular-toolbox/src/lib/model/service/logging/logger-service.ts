/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Inject, Injectable, Optional } from "@angular/core";
import { AbstractLogger } from "../../../framework";
import { ATX_LOGGER_CONFIG, LogConnector, LoggerConfig } from "../../business";

/**
 * A convenient high-level singleton that implements the `Logger` interface.
 */
@Injectable({
    providedIn: 'root'
})
export class LoggerService extends AbstractLogger {

    /**
     * @private
     */
    constructor(@Inject(ATX_LOGGER_CONFIG) @Optional() config: LoggerConfig) {
        super();
        if (config) {
            const connector: LogConnector | undefined = config.logConnector;
            if (connector) this.setLogConnector(connector);
        }
    }
}