/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { XhrProxy, HttpMockLoggingMetadata, HttpRequestMetadata } from "../../../../model";

/**
 * @private
 * A static builder for creating `HttpMockLoggingMetadata` objects.
 */
export class HttpMockLoggingMetadataBuilder {

    /**
     * @private
     * Creates and returns a new `HttpMockLoggingMetadata` object.
     */
    public static build(xhr: XhrProxy, request: HttpRequest<any>, requestMetadata: HttpRequestMetadata): HttpMockLoggingMetadata {
        const responseInit: any = {
            body: xhr.response,
            status: xhr.status,
            statusText: xhr.statusText,
            url: xhr.responseURL,
            headers: xhr.getAllResponseHeaders()
        };
        const response: HttpResponse<any> = new HttpResponse(responseInit);
        return {
            request: request,
            response: response,
            requestMetadata: requestMetadata
        };
    }
}