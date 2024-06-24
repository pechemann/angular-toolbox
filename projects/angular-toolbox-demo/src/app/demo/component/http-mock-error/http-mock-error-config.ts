import { HttpRequest } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from "angular-toolbox";
import { getTodo, Todo } from "../../util/http-mock/http-mock-util";

const error: HttpMockError = {
    status: 400,
    statusText: "Bad Request"
};

export const config: HttpMockConfig = {
    origin: "https://jsonplaceholder.typicode.com",
    interceptors: [
        {
            id: "getTodo",
            endpoints: [
                {
                    route: "/todos/:id",
                    get: {
                        data: (req: HttpRequest<Todo>, params: any)=> httpResponseMock().body( getTodo(params) )
                                                                                        .response(error)
                    }
                }
            ]
        }
    ]
};