/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockProductionPolicy } from "./http-mock-production-policy.enum";
import { HttpMockingFrameworkConfig } from "./http-mocking-framework-config";

/**
 * The default provider for the HTTP Mocking Framework configuration. You typically define
 * the custom properties in the main NgModule declaration to initialize the HTTP Mocking Framework:
 * 
 * @NgModule({
 * ...
 * providers: [
 *   { provide: HTTP_MOCKING_FRAMEWORK_CONFIG, useValue: { disableVisualFlag: true, productionPolicy: HttpMockProductionPolicy.WARNING } }
 * ],
 * ...
 * });
 */
export const HTTP_MOCKING_FRAMEWORK_CONFIG: HttpMockingFrameworkConfig = {
    
    /**
     * Indicates whether the visual flag is visible (`false`), or not (`true`).
     * Default value is `false`.
     */
    disableVisualFlag: false,

    /**
     * Indicates the behavior of the framework when it is used in production mode.
     * Default value is `HttpMockProductionPolicy.ERROR`.
     */
    productionPolicy: HttpMockProductionPolicy.ERROR
};