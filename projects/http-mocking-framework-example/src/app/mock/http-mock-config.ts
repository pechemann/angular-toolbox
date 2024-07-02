/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from "angular-toolbox";
import { Todo } from "../model/business/todo";
import { DataStorage } from "./data-storage";
import { validateUser } from "./validate-user";

const DATA_STORAGE: DataStorage = new DataStorage();

const NOT_FOUND_ERROR: HttpMockError = {
    status: HttpStatusCode.NotFound,
    statusText: "Not Found"
};

export const TODOS_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "todoCollection",
            endpoints: [
                {
                    route: "/todos/:userId",
                    get: {
                        data: (req: HttpRequest<Todo>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId)
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.getTodoCollection(userId) ).response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    },
                    delete: {
                        data: (req: HttpRequest<Todo>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId)
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.deteteTodoCollection(userId) ).response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
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