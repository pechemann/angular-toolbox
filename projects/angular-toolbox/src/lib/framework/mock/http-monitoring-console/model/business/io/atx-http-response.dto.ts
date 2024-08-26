/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { AtxBodyDto } from "./atx-body-dto";
import { AtxHeaderDto } from "./atx-header-dto";

/**
 * @private
 * The interface that must be implementd by ATX `HttpResponse` DTOs.
 */
export interface AtxHttpResponseDto {

    /**
     * @private
     * The list of the `HttpHeaders` of the `HttpResponse`.
     */
    headers: AtxHeaderDto[];

    /**
     * @private
     * The status of the `HttpResponse`.
     */
    status: HttpStatusCode;

    /**
     * @private
     * The status text of the `HttpResponse`.
     */
    statusText: string;

    /**
     * @private
     * The url the `HttpResponse`.
     */
    url: string | null;
    
    /**
     * @private
     * The serialized payload associated with the `HttpResponse`.
     */
    body: AtxBodyDto;
}
