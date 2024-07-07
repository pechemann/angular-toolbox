/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { EMPTY_STRING } from "projects/angular-toolbox/src/public-api";
import { HttpResponseMock } from "../../../../model";
import { DataStorage } from "../core/data-storage";

/**
 * @private
 * A static utility class for building `DataStorage` objects.
 */
export class DataStorageBuilder {

    /**
     * @private
     * Builds and returns a new `DataStorage` objects.
     * 
     * @param httpResponse The `HttpResponseMock` to be stored by the framework.
     * @param data The data of the HTTP response to be stored by the framework.
     * 
     * @returns A new `DataStorage` objects.
     */
    public static buildDataStorage(httpResponse: HttpResponseMock, data: any): DataStorage {
        // TODO: add support for different data types (string, Blob, etc.)
        const stringifiedData: string = data ? JSON.stringify(data) : EMPTY_STRING;
        return {
            httpResponse: httpResponse,
            loaded: 0,
            total: data ? new Blob([stringifiedData]).size : 0,
            data: data,
            stringifiedData: stringifiedData
        };
    }
}
