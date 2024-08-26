/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxBodyDto } from "./atx-body-dto";
import { AtxHeaderDto } from "./atx-header-dto";

/**
 * @private
 * The interface that must be implementd by ATX `HttpRequest` DTOs.
 */
export interface AtxHttpRequestDto {

    /**
     * @private
     * The DTO that represents the serialized HTTP data.
     */
    body: AtxBodyDto;

    /**
     * @private
     * Indicates whether the `HttpRequest` must report progress, or not.
     */
    reportProgress: boolean;
    
    /**
     * @private
     * Indicates whether the `HttpRequest` has credentials, or not.
     */
    withCredentials: boolean;
    
    /**
     * @private
     * The response type of the `HttpRequest`.
     */
    responseType: string;
    
    /**
     * @private
     * The method of the `HttpRequest`.
     */
    method: string;
    
    /**
     * @private
     * The list of the `HttpHeaders` of the `HttpRequest`.
     */
    headers: AtxHeaderDto[];
    
    /**
     * @private
     * The url of the `HttpRequest`.
     */
    url: string;
    
    /**
     * @private
     * The serialized parameters of the `HttpRequest`.
     */
    params: string;
}