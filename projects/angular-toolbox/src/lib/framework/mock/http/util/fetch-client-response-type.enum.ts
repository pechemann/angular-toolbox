/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

/**
 * Defines the possible values for the `responseType` property of the
 * `FetchClientBuilder.buildFetchClient()` method.
 */
export enum FetchClientResponseType {

    /**
     * Allows to return the response as a promise that resolves with an `ArrayBuffer`.
     */
    ARRAY_BUFFER = "arrayBuffer",
    
    /**
     * Allows to return the response as a promise that resolves with a `Blob`.
     */
    BLOB = "blob",

    /**
     * Allows to return the response as a promise that resolves with a `FormData` object.
     */
    FORM_DATA = "formData",

    /**
     * Allows to return the response as a promise which resolves with the result of parsing the body text as JSON.
     */
    JSON = "json",
    
    /**
     * Allows to return the response as a promise that resolves with a `String`.
     * The response is always decoded using UTF-8.
     */
    TEXT = "text",
        
    /**
     * Allows to return the response as a promise that resolves with a `Response` object.
     */
    RESPONSE = "response"
}
