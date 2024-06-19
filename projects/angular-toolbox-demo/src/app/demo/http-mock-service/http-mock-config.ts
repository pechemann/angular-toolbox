import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "angular-toolbox";

export const config: HttpMockConfig = {
    routes: [
        {
            path: "/test",
            get: {
                data: (req: HttpRequest<any>)=> httpResponseMock().body("Lorem Ipsum").response(),
                error: (req: HttpRequest<any>)=> {
                    // Build error dynamically depending on input value.
                    return httpResponseMock().status(HttpStatusCode.NotFound).statusText("Fuck You!").response();
                }
            }
        }
    ]
};