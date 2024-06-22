/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { inject } from "@angular/core";
import { HttpMockService } from "../../../../model/service/mock/http/http-mock.service";
import { XhrProxyFactoryImpl } from "./http-mock-factory.impl";

/**
 * A factory function that creates and returns a new `XhrFactory` object.
 * 
 * @returns A new `XhrFactory` object.
 */
export const httpMockFactory = ()=> {
    return new XhrProxyFactoryImpl(inject(HttpMockService));
}
