/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpHeaders, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { httpHeadersMock, HttpMockConfig, httpResponseMock, HttpResponseMockBuilder } from 'projects/angular-toolbox/src/public-api';
import { COMPLEX_JSON, CREATED_ITEM_DTO, DELETED_ITEM_DTO, EMPTY_ITEM_DTO, getPngBlobData, getArrayBufferData, NOT_FOUND_ERROR, PHP_ERROR, TEXT_DATA, UNAUTHORIZED_ERROR, UPDATE_ITEM_DTO, VALID_PASSWORD, DATA_STORAGE } from './http-mock-data';
import { ItemDto } from './http-mock-business';

export const MONITORING_MOCK_CONFIG: HttpMockConfig = {
    description: "A HTTP API that shows the ATX HTTP Mocking Framework capabilities.",
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "basic",
            description: "A basic sample that shows how to create mocks for a REST-based CRUD API.",
            endpoints: [
                {
                    route: "/api/monitoring",
                    post: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            if (DATA_STORAGE.item) builder.status(HttpStatusCode.Conflict);
                            else {
                                DATA_STORAGE.item = EMPTY_ITEM_DTO;
                                builder.status(HttpStatusCode.Created).body(CREATED_ITEM_DTO);
                            }
                            return builder.response();
                        },
                        descriptor: {
                            description: "Sends a request for the server to create a new <code>Item</code> object.",
                            payload: "A <code>TokenDto</code> object.",
                            body: "Returns an <code>ItemDto</code> object."
                        }
                    },
                    descriptor: {
                        description: "Creates a new <code>Item</code> object."
                    }
                },
                {
                    route: "/api/monitoring/:id",
                    descriptor: {
                        description: "Performs (C)RUD operations over the specified item.",
                        params: [
                            { ref: "id", description: "The reference to the item on which to perform a (C)RUD operation."}
                        ]
                    },
                    put: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            if (DATA_STORAGE.item) {
                                DATA_STORAGE.item = UPDATE_ITEM_DTO;
                                return builder.status(HttpStatusCode.NoContent).response();
                            }
                            return builder.response(NOT_FOUND_ERROR);
                        }
                    },
                    get: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            const item: ItemDto | null = DATA_STORAGE.item;
                            if (item) return builder.status(HttpStatusCode.Ok).body(item).response();
                            return builder.response(NOT_FOUND_ERROR);
                        }    
                    },
                    delete: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            if (DATA_STORAGE.item) {
                                DATA_STORAGE.item = null;
                                builder.status(HttpStatusCode.Ok).body(DELETED_ITEM_DTO).response();
                            }
                            return builder.response(NOT_FOUND_ERROR);
                        }                             
                    }
                }
            ]
        },
        {
            id: "json",
            endpoints: [
                {
                    route: "/api/monitoring/actors",
                    get: {
                        data: (request: HttpRequest<any>)=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            const age: string | null = request.params?.get("age");
                            return builder.body(age ? COMPLEX_JSON.actors[1] : COMPLEX_JSON.actors).response();
                        }   
                    }
                }
            ]
        },
        {
            id: "formData",
            endpoints: [
                {
                    route: "/api/monitoring/login",
                    post: {
                        data: (request: HttpRequest<any>)=> {
                            const data: FormData = request.body;
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            if (data.get("password") === VALID_PASSWORD) return builder.response();
                            return builder.response(UNAUTHORIZED_ERROR);
                        }   
                    }
                },
                {
                    route: "/api/monitoring/upload",
                    post: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().response()
                    }
                }
            ]
        },
        {
            id: "dataTypes",
            endpoints: [
                {
                    route: "/api/monitoring/data-types/text",
                    get: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().body(TEXT_DATA).response()
                    }
                },
                {
                    route: "/api/monitoring/data-types/png",
                    get: {
                        data: ()=> {
                            const headers: HttpHeaders =
                                httpHeadersMock().contentType('application/octet-stream; image/png').headers();
                            return httpResponseMock().headers(headers).delay().body(getPngBlobData()).response()
                        }
                            
                    }
                },
                {
                    route: "/api/monitoring/data-types/binary",
                    get: {
                        data: ()=> {
                            const headers: HttpHeaders =
                                httpHeadersMock().contentType('application/octet-stream;').headers();
                            return httpResponseMock().headers(headers).delay().body(getArrayBufferData()).response()
                        }
                            
                    }
                }
            ]
        },
        {
            id: "php",
            endpoints: [
                {
                    route: "/api/monitoring/php-error",
                    get: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().body(PHP_ERROR).response()
                    }
                }
            ]
        }
    ]
};
