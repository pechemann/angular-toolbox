import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "projects/angular-toolbox/src/public-api";

const USER: any = {
    userId: 3,
    id: 3,
    title: "lorem ipsum",
    completed: true
};

export const config: HttpMockConfig = {
    routes: [
        {
            path: "https://jsonplaceholder.typicode.com/todos/3",
            get: {
                data: (req: HttpRequest<any>)=> httpResponseMock().body(USER)
                                                                  .response(),
                error: (req: HttpRequest<any>)=> httpResponseMock().status(HttpStatusCode.NotFound)
                                                                   .statusText("Not Found")
                                                                   .response()
            }
        }
    ]
};