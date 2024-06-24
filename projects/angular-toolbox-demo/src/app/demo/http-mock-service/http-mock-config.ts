import { HttpRequest } from "@angular/common/http";
import { HttpMockConfig, HttpMockError, httpResponseMock } from "angular-toolbox";

export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};

const loremIpsum: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore'];

const getRandomString = (size: number, isFirst: boolean = true): string => {
    let result: string = loremIpsum[Math.floor(Math.random()* loremIpsum.length)];
    if (size > 1) result += " " + getRandomString(--size, false);
    if (isFirst) return result.charAt(0).toUpperCase() + result.slice(1);
    return result;
};

const getRandomBoolean = (): boolean => Math.random() < 0.4;

const error: HttpMockError = {
    status: 400,
    statusText: "Bad Request",
};

const getTodo = (params: any): Todo => {
    return {
        id: params.id,
        userId: 1,
        title: getRandomString(4),
        completed: getRandomBoolean()
    };
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