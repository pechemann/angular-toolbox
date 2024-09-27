/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { DataStorage } from "./data-storage";
import { validateUser } from "./validate-user";
import { TodoDto } from "../../model/business/dto/todo.dto";
import { UpdateTodoDto } from "../../model/business/dto/update-todo.dto";

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
                    route: "/api/todos/:userId",
                    get: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.getTodoCollection(userId) )
                                                                         .defaultHeaders()
                                                                         .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    },
                    delete: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.deteteTodoCollection(userId) )
                                                                         .defaultHeaders()
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
                    route: "/api/todos/:userId/todo",
                    post: {
                        data: (req: HttpRequest<string>, params: any)=> {
                            const responseMock = httpResponseMock();
                            if ( req.body === null) return responseMock.response(BAD_REQUEST_ERROR);
                            const userId: number = parseInt(params.userId);
                            if (!validateUser(userId)) return responseMock.response(NOT_FOUND_ERROR);
                            const dto: TodoDto = DATA_STORAGE.addTodo(userId, req.body);
                            return responseMock.body( dto )
                                               .defaultHeaders()
                                               .status(HttpStatusCode.Created)
                                               .response();
                        }
                    }
                },
                {
                    route: "/api/todos/:userId/todo/:id",
                    put: {
                        data: (req: HttpRequest<UpdateTodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            if ( req.body === null) return responseMock.response(BAD_REQUEST_ERROR);
                            const userId: number = parseInt(params.userId);
                            if (!validateUser(userId)) return responseMock.response(NOT_FOUND_ERROR);
                            const id: number = parseInt(params.id);
                            const dto: UpdateTodoDto = JSON.parse(req.body as any);
                            const result: boolean = DATA_STORAGE.updateTodo(userId, id, dto.title, dto.completed);
                            if (result) return responseMock.body( null )
                                                           .defaultHeaders()
                                                           .status(HttpStatusCode.NoContent)
                                                           .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    },
                    delete: {
                        data: (req: HttpRequest<UpdateTodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (!validateUser(userId)) return responseMock.response(NOT_FOUND_ERROR);
                            const id: number = parseInt(params.id);
                            const result: boolean = DATA_STORAGE.deleteTodo(userId, id);
                            if (result) return responseMock.body( id )
                                                           .defaultHeaders()
                                                           .status(HttpStatusCode.Accepted)
                                                           .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        }
                    }
                }
            ]
        }
    ]
};