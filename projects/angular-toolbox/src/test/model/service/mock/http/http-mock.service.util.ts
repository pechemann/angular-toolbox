/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpMockConfig, httpResponseMock, Uuid } from "projects/angular-toolbox/src/public-api";

export const INVALID_ORIGIN: string = "https://www.foo-bar.com/";

export const VALID_ORIGIN: string = "https://www.foo-bar.com";

export const getEmptyMockConfig = (): HttpMockConfig =>{
    return {
        interceptors: []
    };
};

export const EMPTY_MOCK_CONFIG_WITH_ID: HttpMockConfig = {
    id: Uuid.build(),
    interceptors: []
};


export const MOCK_CONFIG: HttpMockConfig = {
    id: Uuid.build(),
    interceptors: [{
        id: "testEndpoint",
        origin: VALID_ORIGIN,
        endpoints: [
            {
                route: "/test/:id",
                get: {
                    data: ()=> httpResponseMock().response()
                },
                delete: {
                    data: ()=> httpResponseMock().response()
                }
            }
        ]
    }]
};