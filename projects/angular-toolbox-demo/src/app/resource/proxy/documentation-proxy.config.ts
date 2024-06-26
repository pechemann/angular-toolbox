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