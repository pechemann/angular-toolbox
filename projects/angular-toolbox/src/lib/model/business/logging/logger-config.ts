/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LogConnector } from "./log-connector";

/**
 * Defines properties for the `LoggerService` configuration.
 */
export interface LoggerConfig {

    /**
     * Defines the log connector of the `LoggerService` singleton.
     */
    logConnector?: LogConnector;
}
