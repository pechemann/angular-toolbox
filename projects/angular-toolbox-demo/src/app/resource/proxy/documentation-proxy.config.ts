/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */


import { HttpMockConfig, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { Observable, from } from 'rxjs';

const getBody = (path: string): Observable<string>=> {
    return from(fetch(`http://localhost:4200/documentation/${path}`).then(r => r.text()));
}

export const DOCUMENTATION_PROXY_CONFIG: HttpMockConfig = {
    interceptors: [
        {
            id: "getDoc",
            origin: "https://pascalechemann.com",
            endpoints: [
                {
                    route: "/angular-toolbox/documentation/*",
                    get: {
                        data: (req: any, params: any)=> httpResponseMock().body(getBody(params[0])).response()
                    }
                }
            ]
        }
      ]
  }