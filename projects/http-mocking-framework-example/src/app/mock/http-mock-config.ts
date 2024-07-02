/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpRequest } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "angular-toolbox";
import { Todo } from "../model/business/todo";
import { Storage } from "./storage";

const STORAGE: Storage = new Storage();

export const TODOS_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "todoCollection",
            endpoints: [
                {
                    route: "/todos/:userId",
                    get: {
                        data: (req: HttpRequest<Todo>, params: any)=> httpResponseMock().body( STORAGE.getTodoCollection(params.userId) )
                                                                                        .response()
                    }
                }
            ]
        },
        {
            id: "todo",
            endpoints: [
                {
                    route: "/todos/:userId/:id",
                    get: {
                        data: (req: HttpRequest<Todo>, params: any)=> httpResponseMock().body( null )
                                                                                        .response()
                    }
                }
            ]
        }
    ]
};