/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { SayHelloDtoBuilder } from "../../my-awsome-company/model/util/say-hello-dto.builder";

const responseBuilder: SayHelloDtoBuilder = new SayHelloDtoBuilder();

export const SAY_HELLO_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "sayHello",
            endpoints: [
                {
                    route: "/api/sayHello/:name",
                    get: {
                        data: (req: HttpRequest<any>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const name: string = params.name;
                            return responseMock.body( responseBuilder.build(name) ).response();
                        }
                    }
                }
            ]
        }
    ]
};