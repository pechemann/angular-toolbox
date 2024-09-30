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
    description: "A basic sample that shows how to create a forward proxy by using the HTTP Mocking Framework API.",
    interceptors: [
        {
            id: "message",
            description: "Sends and reads messages from a local PHP server.",
            endpoints: [
                {
                    route: "/api/message",
                    post: {
                        data: (req: HttpRequest<any>)=> {
                            return httpResponseMock().body(postMessage(req.body)).response();
                        },
                        descriptor: {
                            description: "Sends a message to the PHP server.",
                            payload: "A string: the message to send."
                        }
                    },
                    get: {
                        data: (req: HttpRequest<any>)=> {
                            const id: string = req.params.get("id") as any;
                            return httpResponseMock().body(getMessage(id)).response();
                        },
                        descriptor: {
                            description: "Gets a message from the PHP server.",
                            queryParams: [
                                { ref: "id", description: "The id of the message to get."}
                            ],
                            body: "A string: the message to get."
                        }
                    },
                    descriptor: {
                        description: "Uses the <code>FetchClient</code> API to send and get messages from a local PHP server"
                    }
                }
            ]
        }
    ]
};