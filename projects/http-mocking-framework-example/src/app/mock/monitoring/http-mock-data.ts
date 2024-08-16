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

export const UNAUTHORIZED_ERROR: HttpMockError = {
    status: HttpStatusCode.Unauthorized,
    statusText: "Unauthorized"
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

export const EMAIL_SAMPLE: string = "ryo.saeba@city-hunter.com";
export const VALID_PASSWORD: string = "xyz";

export const TEXT_DATA: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const PHP_ERROR: string = `<html><head></head><body><br>
<font size="1"><table class="xdebug-error xe-parse-error" dir="ltr" border="1" cellspacing="0" cellpadding="1">
<tbody><tr><th align="left" bgcolor="#f57900" colspan="5"><span style="background-color: #cc0000; color: #fce94f; font-size: x-large;">( ! )</span> Parse error: syntax error, unexpected token "=" in C:\\wamp64\\www\\angular-toolbox\\foo\\bar\\index.php on line <i>13</i></th></tr>
</tbody></table></font>
</body></html>`;