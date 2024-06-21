import { HttpRequest } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "projects/angular-toolbox/src/public-api";

export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};

const getTodo = (params: any): Todo => {
    const id: number = params.id;
    return {
        id: id,
        userId: id,
        title: "lorem ipsum",
        completed: true
    }
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
                                                                                        .response()
                    }
                }
            ]
        }
    ]
};