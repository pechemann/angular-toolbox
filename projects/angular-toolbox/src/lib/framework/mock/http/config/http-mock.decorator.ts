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
        const getMockService = (instance: any): HttpMockService | undefined => {
            return Object.values(instance).find((v: any)=> {
                return (v.hasOwnProperty('type') && v.type === HTTP_MOCK_SERVICE);
            }) as any;
        };
        const ngOnInit = constructor.prototype.ngOnInit;
        const ngOnDestroy = constructor.prototype.ngOnDestroy;
        const uiid: Uuid = config.id || Uuid.build();
        if (!ngOnDestroy) throw new ReferenceError("Component must implement the OnDestroy interface.");
        if (!ngOnInit) throw new ReferenceError("Component must implement the OnInit interface.");
        if (!config.id) config.id = uiid;
        constructor.prototype.ngOnInit = function() {
            const mockService: HttpMockService | undefined = getMockService(this);
            if (!mockService) throw new ReferenceError("No provider found for HttpMockService.");
            mockService.addConfig(config);
            ngOnInit.call(this);
        };
        constructor.prototype.ngOnDestroy = function() {
            const mockService: HttpMockService | undefined = getMockService(this);
            // An exception is already thrown by the ngOnInit() method when HttpMockService is not provided.
            // Following check statement prevents failure during Unit Testing:
            if (mockService) mockService.removeConfig(uiid);
            ngOnDestroy.call(this);
        };
    };
}
