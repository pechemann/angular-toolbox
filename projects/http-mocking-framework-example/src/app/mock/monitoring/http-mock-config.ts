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
                            body: "An <code>ItemDto</code> object."
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
                        },
                        descriptor: {
                            description: "Updates the <code>Item</code> object with the specified ID.",
                            payload: "An <code>UpdateItemDto</code> object."
                        }
                    },
                    get: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            const item: ItemDto | null = DATA_STORAGE.item;
                            if (item) return builder.status(HttpStatusCode.Ok).body(item).response();
                            return builder.response(NOT_FOUND_ERROR);
                        },
                        descriptor: {
                            description: "Gets the <code>Item</code> object with the specified ID.",
                            payload: "A <code>TokenDto</code> object.",
                            body: "An <code>ItemDto</code> object."
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
                        },
                        descriptor: {
                            description: "Deletes the <code>Item</code> object with the specified ID.",
                            body: "An <code>ItemDto</code> object."
                        }        
                    }
                }
            ]
        },
        {
            id: "json",
            description: "A sample mock that shows how to access JSON objects and mock query string parameters",
            endpoints: [
                {
                    route: "/api/monitoring/actors",
                    descriptor: {
                        description: "Returns a list of <code>ActorDto</code> objects."
                    },
                    get: {
                        data: (request: HttpRequest<any>)=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            const age: string | null = request.params?.get("age");
                            return builder.body(age ? [COMPLEX_JSON.actors[1]] : COMPLEX_JSON.actors).response();
                        },
                        descriptor: {
                            description: "Returns a list of <code>ActorDto</code> objects that match the specified query parameters.<br>If no query parameters is specified, it returns the complete list.",
                            body: "An array of <code>ActorDto</code> objects.",
                            queryParams: [
                                { ref: "age", description: "Allows to find actors with the specified age."}
                            ]
                        }  
                    }
                }
            ]
        },
        {
            id: "formData",
            description: "A sample mock that shows how to process <code>FormData</code> objects.",
            endpoints: [
                {
                    route: "/api/monitoring/login",
                    descriptor: {
                        description: "Sends credentials to the server."
                    },
                    post: {
                        data: (request: HttpRequest<any>)=> {
                            const data: FormData = request.body;
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders().delay();
                            if (data.get("password") === VALID_PASSWORD) return builder.response();
                            return builder.response(UNAUTHORIZED_ERROR);
                        },
                        descriptor: {
                            description: "Sends an email/password pair to authenticate the user.",
                            payload: "A <code>FormData</code> objects.",
                        }
                    }
                },
                {
                    route: "/api/monitoring/upload",
                    descriptor: {
                        description: "Uploads data to the server."
                    },
                    post: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().response(),
                        descriptor: {
                            description: "Allows to upload a text file to server.",
                            payload: "A <code>FormData</code> object that contains the <code>File</code> object to upload.",
                        }
                    }
                }
            ]
        },
        {
            id: "dataTypes",
            description: "Demonstrates how to mock different data types.",
            endpoints: [
                {
                    route: "/api/monitoring/data-types/text",
                    get: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().body(TEXT_DATA).response(),
                        descriptor: {
                            description: "Returns a raw string file.",
                            body: "A raw string file.",
                        }
                    },
                    descriptor: {
                        description: "Shows how to respond to a HTTP request with the <code>responseType</code> header parameter set to <code>\"text\"</code>."
                    }
                },
                {
                    route: "/api/monitoring/data-types/png",
                    get: {
                        data: ()=> {
                            const headers: HttpHeaders =
                                httpHeadersMock().contentType('application/octet-stream; image/png').headers();
                            return httpResponseMock().headers(headers).delay().body(getPngBlobData()).response()
                        },
                        descriptor: {
                            description: "Returns a PNG file.",
                            body: "A blob that represents a PNG file.",
                        } 
                    },
                    descriptor: {
                        description: "Shows how to respond to a HTTP request with the <code>responseType</code> header parameter set to <code>\"blob\"</code>."
                    }
                },
                {
                    route: "/api/monitoring/data-types/binary",
                    get: {
                        data: ()=> {
                            const headers: HttpHeaders =
                                httpHeadersMock().contentType('application/octet-stream;').headers();
                            return httpResponseMock().headers(headers).delay().body(getArrayBufferData()).response()
                        },
                        descriptor: {
                            description: "Returns a string as binary data.",
                            body: "A set of binary data that represents a string file.",
                        }
                    },
                    descriptor: {
                        description: "Shows how to respond to a HTTP request with the <code>responseType</code> header parameter set to <code>\"arraybuffer\"</code>."
                    }
                }
            ]
        },
        {
            id: "php",
            description: "Shows how to emulate a PHP error.",
            endpoints: [
                {
                    route: "/api/monitoring/php-error",
                    get: {
                        data: ()=> httpResponseMock().defaultHeaders().delay().body(PHP_ERROR).response(),
                        descriptor: {
                            description: "A PHP error that can be rendered as an HTML file.",
                            body: "Returns a string that represents a PHP error.",
                        }
                    },
                    descriptor: {
                        description: "Returns an HTTP fragment that contains the representation of a PHP error."
                    }
                }
            ]
        }
    ]
};
