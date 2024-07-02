/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from "angular-toolbox";
import { DataStorage } from "./data-storage";
import { validateUser } from "./validate-user";
import { TodoDto } from "../model/business/dto/todo.dto";
import { CreateTodoDto } from "../model/business/dto/create-todo.dto";

const DATA_STORAGE: DataStorage = new DataStorage();

const NOT_FOUND_ERROR: HttpMockError = {
    status: HttpStatusCode.NotFound,
    statusText: "Not Found"
};

const BAD_REQUEST_ERROR: HttpMockError = {
    status: HttpStatusCode.BadRequest,
    statusText: "Bad Request"
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
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId)
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.getTodoCollection(userId) )
                                                                         .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    },
                    delete: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId)
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.deteteTodoCollection(userId) )
                                                                         .response();
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
                    route: "/todos/:userId/todo",
                    post: {
                        data: (req: HttpRequest<CreateTodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            if ( req.body === null) return responseMock.response(BAD_REQUEST_ERROR);
                            const createDto: CreateTodoDto = JSON.parse(req.body as any);
                            const dto: TodoDto = DATA_STORAGE.addTodo(createDto.userId, createDto.title);
                            return httpResponseMock().body( dto )
                                                     .status(HttpStatusCode.Created)
                                                     .statusText("Created")
                                                     .response();
                        }
                    }
                }
            ]
        }
    ]
};