/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpStatusCode } from "@angular/common/http";
import { HttpMockError, Uuid } from 'projects/angular-toolbox/src/public-api';
import { CreatedItem, Token } from "./http-mock-business";

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

export const CREATED_ITEM: CreatedItem = {
    id: Uuid.build().toString()
};
