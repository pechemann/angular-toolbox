/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */


import { HttpMockConfig, httpResponseMock } from 'angular-toolbox';
import { Observable, from } from 'rxjs';

const getBody = (path: string): Observable<string>=> {
    return from(fetch(`http://localhost:4200/documentation/${path}`).then(x => x.text()));
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