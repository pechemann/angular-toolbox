/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockProductionPolicy } from "./http-mock-production-policy.enum";

/**
 * Defines properties for the HTTP Mocking framework configuration.
 */
export interface HttpMockingFrameworkConfig {

    /**
     * Indicates whether the visual flag is visible (`false`), or not (`true`).
     */
    disableVisualFlag?: boolean;

    /**
     * Indicates the behavior of the framework when it is used in production mode.
     */
    productionPolicy?: HttpMockProductionPolicy;
}
