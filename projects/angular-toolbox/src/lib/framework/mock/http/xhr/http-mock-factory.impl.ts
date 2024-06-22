/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { XhrFactory } from "@angular/common";
import { HttpMockService } from "../../../../model/service/mock/http/http-mock.service";
import { XhrProxyImpl } from "./xhr-proxy-impl";

/**
 * @private
 * The concrete implementation of the `XhrFactory` interface.
 */
export class XhrProxyFactoryImpl extends XhrFactory {

    /**
     * @private
     */
    constructor(private _httpMockService: HttpMockService) {
        super();
    }

    /**
     * @private
     */
    public build(): XMLHttpRequest {
        return new XhrProxyImpl(this._httpMockService);
    }
}
