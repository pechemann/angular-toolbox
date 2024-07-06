/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Uuid } from "../../../../util";
import { HTTP_MOCK_SERVICE, HttpMockConfig, HttpMockService } from "../../../../model";

/**
 * The definition function for the `@HttpMock` decorator.
 * 
 * @param config The `HttpMockConfig` object used to initialize the HTTP Mocking Framework.
 */
export const HttpMock: Function = (config: HttpMockConfig): Function => {
    return (constructor: any)=> {
        const getMockService = (instance: any): HttpMockService => {
            const mockService: any = Object.values(instance).find((v: any)=> {
                return (v.hasOwnProperty('type') && v.type === HTTP_MOCK_SERVICE);
            });
            if (!mockService) throw new ReferenceError("HttpMockService is not provided into component.");
            return mockService;
        };
        const ngOnInit = constructor.prototype.ngOnInit;
        if (!ngOnInit) throw new ReferenceError("Component must implement the OnInit interface.");
        const ngOnDestroy = constructor.prototype.ngOnDestroy;
        if (!ngOnDestroy) throw new ReferenceError("Component must implement the OnDestroy interface.");
        const uiid: Uuid = config.id || Uuid.build();
        if (!config.id) config.id = uiid;
        constructor.prototype.ngOnInit = function() {
            getMockService(this).addConfig(config);
            ngOnInit.call(this);
        };
        constructor.prototype.ngOnDestroy = function() {
            getMockService(this).removeConfig(uiid);
            ngOnDestroy.call(this);
        };
    };
}
