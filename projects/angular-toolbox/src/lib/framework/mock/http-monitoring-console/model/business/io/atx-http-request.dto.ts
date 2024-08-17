/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


export interface AtxHttpRequestDto {
    body: any;
    reportProgress: boolean;
    withCredentials: boolean;
    responseType: string;
    method: string;
    headers: any[];
    params: string;
    context: any[];
    urlWithParams: string;
}