/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpMockError, Uuid } from 'projects/angular-toolbox/src/public-api';
import { ItemDto, Token, UpdateItemDto } from "./http-mock-business";

export const NOT_FOUND_ERROR: HttpMockError = {
    status: HttpStatusCode.NotFound,
    statusText: "Not Found"
};

export const BAD_REQUEST_ERROR: HttpMockError = {
    status: HttpStatusCode.BadRequest,
    statusText: "Bad Request"
};

export const TOKEN: Token = {
    id: Uuid.build().toString()
};

export const CREATED_ITEM_DTO: ItemDto = {
    id: Uuid.build().toString()
};

export const DELETED_ITEM_DTO: ItemDto = {
    id: CREATED_ITEM_DTO.id
};

export const EMPTY_ITEM_DTO: UpdateItemDto = {
    id: Uuid.build().toString(),
    data: null
};

export const UPDATE_ITEM_DTO: UpdateItemDto = {
    id: Uuid.build().toString(),
    data: {
        foo: "bar"
    }
};

// from https://codeblogmoney.com/json-example-with-data-types-including-json-array/

export const COMPLEX_JSON: any = {
    "actors": [
        {
            "name": "Tom Cruise",
            "age": 56,
            "bornPlace": "Syracuse, NY",
            "birthdate": "July 3, 1962",
            "photo": "https://jsonformatter.org/img/tom-cruise.jpg",
            "wife": null,
            "weight": 67.5,
            "hasChildren": true,
            "hasGreyHair": false,
            "children": [
                "Suri",
                "Isabella Jane",
                "Connor"
            ]
        },
        {
            "name": "Robert Downey Jr.",
            "age": 53,
            "bornPlace": "New York City, NY",
            "birthdate": "April 4, 1965",
            "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",
            "wife": "Susan Downey",
            "weight": 77.1,
            "hasChildren": true,
            "hasGreyHair": false,
            "children": [
                "Indio Falconer",
                "Avri Roel",
                "Exton Elias"
            ]
        }
    ]
};
