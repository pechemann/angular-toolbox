/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { HttpResponseMock } from "../../../../model";

/**
 * @private
 * Utility interface used by the `DelegateXhr` class to store HTTP request information.
 */
export interface DataStorage {
    
    /**
     * @private
     */
    httpResponse: HttpResponseMock;

    /**
     * @private
     * The amount of data currently loaded.
     */
    loaded: number;

    /**
     * @private
     * The total size of data to load.
     */
    total: number;

    /**
     * @private
     * The loaded data.
     */
    data: any;

    /**
     * @private
     * The JSON string prepresentation of the loaded data.
     */
    stringifiedData: string;
}
