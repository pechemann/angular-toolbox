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
    description: "The API used by the \"TODO\" sample application.",
    interceptors: [
        {
            id: "todoCollection",
            description: "Allows to work with collections of <code>Todo</code> objects.",
            endpoints: [
                {
                    route: "/api/todos/:userId",
                    descriptor: {
                        description: "Allows to read or delete collections of <code>Todo</code> objects associated with the specified user ID.",
                        params: [
                            { ref: "userId", description: "The ID of the user associated with collection of <code>Todo</code> objects to manipulate." }
                        ]
                    },
                    get: {
                        data: (req: HttpRequest<TodoDto>, params: any)=> {
                            const responseMock = httpResponseMock();
                            const userId: number = parseInt(params.userId);
                            if (validateUser(userId)) return responseMock.body( DATA_STORAGE.getTodoCollection(userId) )
                                                                         .defaultHeaders()
                                                                         .response();
                            return responseMock.response(NOT_FOUND_ERROR);
                        },
                        descriptor: {
                            description: "Returns the collection of <code>Todo</code> objects associated with the specified user.",
                            body: "A collection of <code>Todo</code> objects."
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
                        },
                        descriptor: {
                            description: "Deletes the collection of <code>Todo</code> objects associated with the specified user.",
                            body: "A boolean that indicates whether the collection has been deleted (<code>true</code>), or not (<code>false</code>)."
                        }
                    }
                }
            ]
        },
        {
            id: "todo",
            description: "Mock a REST-based CRUD API for managing <code>Todo</code> objects",
            endpoints: [
                {
                    route: "/api/todos/:userId/todo",
                    descriptor: {
                        description: "Creates a new <code>Todo</code> object associated with the specified user.",
                        params: [
                            { ref: "userId", description: "The ID of the user that creates the <code>Todo</code> object." }
                        ]
                    },
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
                        },
                        descriptor: {
                            description: "Creates and returns a new <code>Todo</code> object.",
                            payload: "A string: the title of the <code>Todo</code> object to create.",
                            body: "The newly created <code>Todo</code> object."
                        }
                    }
                },
                {
                    route: "/api/todos/:userId/todo/:id",
                    descriptor: {
                        description: "Updates, or deletes, <code>Todo</code> objects associated with the specified user.",
                        params: [
                            { ref: "userId", description: "The ID of the user that updates, or deletes, <code>Todo</code> objects." },
                            { ref: "id", description: "The ID of <code>Todo</code> object to manipulate." }
                        ]
                    },
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
                        },
                        descriptor: {
                            description: "Updates the <code>Todo</code> object with the specified ID.",
                            payload: "An <code>UpdateTodoDto</code> object."
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
                        },
                        descriptor: {
                            description: "Deletes the <code>Todo</code> object with the specified ID."
                        }
                    }
                }
            ]
        }
    ]
};