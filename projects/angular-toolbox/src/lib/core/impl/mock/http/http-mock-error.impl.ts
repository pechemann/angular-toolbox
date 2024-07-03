/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be ound in
 * fthe LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpMockError } from "../../../../model";

/**
 * @private
 * The default implementation of the `HttpMockError` interface.
 */
export class HttpMockErrorImpl implements HttpMockError {

    /**
     * Specifies the error status code.
     */
    public readonly status: HttpStatusCode;

    /**
     * Specifies the error status text.
     */
    public readonly statusText: string;

    /**
     * @private
     */
    constructor(status: HttpStatusCode, statusText: string) {
        if (status < HttpStatusCode.BadRequest) throw new RangeError("Error status must be equal to, or greater than 400; current is: " + status);
        this.status = status;
        this.statusText = statusText;
    }
};