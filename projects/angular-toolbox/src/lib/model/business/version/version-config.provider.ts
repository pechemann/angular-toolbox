/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { VersionConfig } from "./version-config";

/**
 * The default provider for the `VersionService` configuration. You typically define
 * the custom properties in the main `NgModule` declaration to initialize the application
 * config:
 * 
 * @NgModule({
 * ...
 * providers: [
 *   { provide: VERSION_CONFIG, useValue: { major: 1, minor: 2, patch: 12 } }
 * ],
 * ...
 * });
 */
export const VERSION_CONFIG: VersionConfig = {
  
    /**
     * Specifies the major number of this config.
     */
    major: 0,

    /**
     * Specifies the minor number of this config.
     */
    minor: 0,

    /**
     * Specifies the patch number of this config.
     */
    patch: 0,

    /**
     * Specifies the timestamp that corresponds to the build date for this `Version` object.
     * Default value is `NaN`.
     */
    buildTimestamp: NaN
};