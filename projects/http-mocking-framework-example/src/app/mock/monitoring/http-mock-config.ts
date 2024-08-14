/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpRequest, HttpStatusCode } from '@angular/common/http';
import { HttpMockConfig, httpResponseMock, HttpResponseMockBuilder } from 'projects/angular-toolbox/src/public-api';
import { COMPLEX_JSON, CREATED_ITEM_DTO, DELETED_ITEM_DTO, EMPTY_ITEM_DTO, UPDATE_ITEM_DTO } from './http-mock-data';
import { ItemDto } from './http-mock-business';

const DATA_STORAGE: any = {
    item: null
}

export const MONITORING_MOCK_CONFIG: HttpMockConfig = {
    origin: "https://my-awsome-company.com",
    interceptors: [
        {
            id: "basic",
            endpoints: [
                {
                    route: "/api/monitoring",
                    post: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders();
                            if (DATA_STORAGE.item)  builder.status(HttpStatusCode.Conflict).statusText("Conflict");
                            else {
                                DATA_STORAGE.item = EMPTY_ITEM_DTO;
                                builder.status(HttpStatusCode.Created).statusText("Created").body(CREATED_ITEM_DTO);
                            }
                            return builder.response();
                        }
                    }
                },
                {
                    route: "/api/monitoring/:id",
                    put: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders();
                            if (DATA_STORAGE.item) {
                                DATA_STORAGE.item = UPDATE_ITEM_DTO;
                                builder.status(HttpStatusCode.NoContent).statusText("No Content");
                            } 
                            else builder.status(HttpStatusCode.NotFound).statusText("Not Found");
                            return builder.response();
                        }
                    },
                    get: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders();
                            const item: ItemDto | null = DATA_STORAGE.item;
                            if (item) builder.status(HttpStatusCode.Ok).statusText("Ok").body(item);
                            else builder.status(HttpStatusCode.NotFound).statusText("Not Found");
                            return builder.response();
                        }    
                    },
                    delete: {
                        data: ()=> {
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders();
                            if (DATA_STORAGE.item) {
                                DATA_STORAGE.item = null;
                                builder.status(HttpStatusCode.Ok).statusText("Ok").body(DELETED_ITEM_DTO);
                            }
                            else builder.status(HttpStatusCode.NotFound).statusText("Not Found");
                            return builder.response();
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
                            const builder: HttpResponseMockBuilder = httpResponseMock().defaultHeaders();
                            const age: string | null = request.params?.get("age");
                            return builder.body(age ? COMPLEX_JSON.actors[1] : COMPLEX_JSON.actors).response();
                        }   
                    }
                }
            ]
        }
    ]
};
