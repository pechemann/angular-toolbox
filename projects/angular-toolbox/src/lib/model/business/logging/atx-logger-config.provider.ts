/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { LoggerConfig } from "./logger-config";

/**
 * The default provider for the `LoggerService` configuration. You typically define
 * the custom properties in the main NgModule declaration to initialize the logger:
 * 
 * @NgModule({
 * ...
 * providers: [
 *   { provide: ATX_LOGGER_CONFIG, useValue: { dataConnector: new ConsoleLogConnector() } }
 * ],
 * ...
 * });
 */
export const ATX_LOGGER_CONFIG: LoggerConfig = {}
