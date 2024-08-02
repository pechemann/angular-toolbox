/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


/**
 * The list of constant values that can be passed to the `productionPolicy` of the `HttpMockingFrameworkConfig` interface.
 */
export enum HttpMockProductionPolicy {

    /**
     * Indicates that the framework intercepts requests silently in producion mode.
     */
    SILENT = 0,

    /**
     * Indicates that the framework has to send a warning message to the console when a request is intercetped in producion mode.
     */
    WARNING = 1,

    /**
     * Indicates that the framework trhows an error when a request is intercetped in producion mode.
     */
    ERROR = 2
};