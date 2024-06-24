/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { HttpStatusCode } from "@angular/common/http";


/**
 * The `HttpMockError` interface provides the API that must be implemented by HTTP mock errors.
 */
export interface HttpMockError {
    
    /**
     * Error status code.
     */
    status: HttpStatusCode;
    
    /**
     * Textual description of error status code.
     */
    statusText: string;
}
