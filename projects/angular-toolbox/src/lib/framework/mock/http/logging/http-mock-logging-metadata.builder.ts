/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpResponse } from "@angular/common/http";
import { XhrProxy, HttpMockLoggingMetadata, HttpMockRequestMetadata } from "../../../../model";
import { HttpHeadersUtil } from "../util/http-headers.util";

/**
 * @private
 * A static builder for creating `HttpMockLoggingMetadata` objects.
 */
export class HttpMockLoggingMetadataBuilder {

    /**
     * @private
     * Creates and returns a new `HttpMockLoggingMetadata` object.
     */
    public static build(xhr: XhrProxy, request: HttpRequest<any>, requestMetadata: HttpMockRequestMetadata): HttpMockLoggingMetadata {
        const responseInit: any = {
            body: xhr.response,
            status: xhr.status,
            statusText: xhr.statusText,
            url: xhr.responseURL,
            headers: HttpHeadersUtil.encode(xhr.getAllResponseHeaders())
        };
        const response: HttpResponse<any> = new HttpResponse(responseInit);
        return {
            request: request,
            response: response,
            requestMetadata: requestMetadata
        };
    }
}