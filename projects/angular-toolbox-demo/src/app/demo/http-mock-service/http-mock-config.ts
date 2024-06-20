import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "projects/angular-toolbox/src/public-api";

export const config: HttpMockConfig = {
    routes: [
        {
            path: "/test",
            get: {
                data: (req: HttpRequest<any>)=> httpResponseMock().body({ test: "data"})
                                                                  .response(),
                error: (req: HttpRequest<any>)=> httpResponseMock().status(HttpStatusCode.NotFound)
                                                                   .statusText("Not Found")
                                                                   .response()
            }
        }
    ]
};//"Hello world!"