/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from '@angular/common/http';
import { HttpMockConfig, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { CREATED_ITEM } from './http-mock-data';

export const MONITORING_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "basic",
            endpoints: [
                {
                    route: "/api/monitoring",
                    get: {
                        data: ()=> httpResponseMock().defaultHeaders().response()
                    },
                    post: {
                        data: ()=> httpResponseMock().defaultHeaders()
                                                     .status(HttpStatusCode.Created)
                                                     .statusText("Created")
                                                     .body(CREATED_ITEM)
                                                     .response()
                    }
                }
            ]
        }
    ]
};
