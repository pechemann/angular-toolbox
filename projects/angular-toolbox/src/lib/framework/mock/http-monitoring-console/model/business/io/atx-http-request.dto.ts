/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AtxBodyDto } from "./atx-body-dto";
import { AtxHeaderDto } from "./atx-header-dto";

export interface AtxHttpRequestDto {
    body: AtxBodyDto;
    reportProgress: boolean;
    withCredentials: boolean;
    responseType: string;
    method: string;
    headers: AtxHeaderDto[];
    url: string;
    params: string;
}