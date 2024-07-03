/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HTTP_MOCK_SERVICE, HttpMockService } from "../../../../model";

/**
 * 
 * @param config 
 * @returns 
 */
export const HttpMock: Function = (config: any): Function=> {
    return (constructor: any)=> {
        const getMockService = (instance: any): HttpMockService => {
            const mockService: any = Object.values(instance).find((v: any)=> {
                return (v.hasOwnProperty('type') && v.type === HTTP_MOCK_SERVICE);
            });
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
