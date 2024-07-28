/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest } from "@angular/common/http";
import { FetchClientBuilder, HttpMockConfig, httpResponseMock, FetchClientResponseType, FetchClient } from 'projects/angular-toolbox/src/public-api';

// Replace the following value by the path tou you API:
const VIRTUAL_HOST_PATH: string = "http://angular-toolbox/api/message/";

const postMessage = (data: any): FetchClient => {
    const options: RequestInit = {
        method: "POST",
        body: data
    };
    return FetchClientBuilder.buildFetchClient(VIRTUAL_HOST_PATH, options, FetchClientResponseType.RESPONSE);
}

const getMessage = (id: string): FetchClient => 
    FetchClientBuilder.buildFetchClient(VIRTUAL_HOST_PATH + "?id=" + id);

export const MESSAGE_PROXY_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "message",
            endpoints: [
                {
                    route: "/api/message",
                    post: {
                        data: (req: HttpRequest<any>)=> {
                            return httpResponseMock().body(postMessage(req.body)).response();
                        }
                    },
                    get: {
                        data: (req: HttpRequest<any>)=> {
                            const id: string = req.params.get("id") as any;
                            return httpResponseMock().body(getMessage(id)).response();
                        }
                    }
                }
            ]
        }
    ]
};