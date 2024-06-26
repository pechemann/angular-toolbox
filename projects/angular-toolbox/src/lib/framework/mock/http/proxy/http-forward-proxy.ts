/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpMockService } from "../../../../model";

/**
 * 
 * @param config 
 * @returns 
 */
export const HttpForwardProxy: Function = (config: any): Function=> {
    return (constructor: any)=> {
        const getMockService = (instance: any): HttpMockService => {
            const mockService: HttpMockService = Object.values(instance).find((v: any)=> v.constructor.name === "HttpMockService") as any;
            if (!mockService) throw new ReferenceError("HttpMockService is not provided into component.");
            return mockService;
        };
        //TODO: throw error when ngOnInit ngOnDestroy are not defined.
        const ngOnInit = constructor.prototype.ngOnInit;
        const ngOnDestroy = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnInit = function() {
            getMockService(this).addConfig(config);
            ngOnInit.call(this);
        };
        constructor.prototype.ngOnDestroy = function() {
            getMockService(this).clearConfigs();
            ngOnDestroy.call(this);
        };
    };
}
