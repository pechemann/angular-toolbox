/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpErrorResponse } from "@angular/common/http";
import { FetchClient } from "../../../../model";
import { from } from "rxjs";
import { FetchClientResponseType } from "./fetch-client-response-type.enum";

/**
 * A static utility class for building `FetchClient` objects.
 */
export class FetchClientBuilder {

    /**
     * Builds and returns a new `FetchClient` objects.
     * 
     * @param input The definition of the resource to fetch.
     * @param init The object containing options to configure the request.
     * @param responseType Specifies the type of resppnse for the resource to fetch.
     * 
     * @returns A new `FetchClient` object.
     */
    public static buildFetchClient(input: RequestInfo | URL, init: RequestInit | null = null, responseType: FetchClientResponseType = FetchClientResponseType.JSON): FetchClient {
        return from(fetch(input, init || undefined).then((response: Response) => {
            if (response.ok) return FetchClientBuilder.buildResponseStrategy(response, responseType);
            throw new HttpErrorResponse({
                status: response.status,
                statusText: response.statusText
            });
        }));
    }

    /**
     * @private
     */
    private static buildResponseStrategy(response: Response, responseType: FetchClientResponseType): Promise<any>{
        if (responseType === FetchClientResponseType.JSON) return response.json();
        if (responseType === FetchClientResponseType.BLOB) return response.blob();
        if (responseType === FetchClientResponseType.FORM_DATA) return response.formData();
        if (responseType === FetchClientResponseType.ARRAY_BUFFER) return response.arrayBuffer();
        if (responseType === FetchClientResponseType.TEXT) return response.text();
        return response.json();
    }
}
