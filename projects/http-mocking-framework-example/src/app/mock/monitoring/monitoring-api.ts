/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Uuid } from "projects/angular-toolbox/src/public-api";
import { Observable } from "rxjs";
import { CREATED_ITEM_DTO, EMAIL_SAMPLE, TEXT_DATA, TOKEN, UPDATE_ITEM_DTO, VALID_PASSWORD } from "./http-mock-data";

const randomId = (): string=> Uuid.build().toString();

export interface MonitoringApiDescriptor {
    label: string,
    route: string,
    description: string,
    id: string,
    invoker: ()=> Observable<any>
}

export class MonitoringApi {

    public readonly API: MonitoringApiDescriptor[];

    constructor(private http: HttpClient) {
        this.API = this.initAPI();
    }

    private initAPI(): MonitoringApiDescriptor[] {
        return [
            {
                label: "POST / REST",
                route: "/api/monitoring",
                description: "Performs a HTTP REST operation with the POST method and returns the response depending on the state of the remote data storage.",
                id: randomId(),
                invoker: ()=> this.http.post<any>("https://my-awsome-company.com/api/monitoring/", TOKEN)
            },
            {
                label: "GET / REST",
                route: "/api/monitoring" + CREATED_ITEM_DTO.id,
                description: "Performs a HTTP REST operation with the GET method and returns the response depending on the state of the remote data storage.",
                id: randomId(),
                invoker: ()=> this.http.get("https://my-awsome-company.com/api/monitoring/" + CREATED_ITEM_DTO.id)
            },
            
            {
                label: "PUT / REST",
                route: "/api/monitoring/" + CREATED_ITEM_DTO.id,
                description: "Performs a HTTP REST operation with the PUT method and returns the response depending on the state of the remote data storage.",
                id: randomId(),
                invoker: ()=> this.http.put<any>("https://my-awsome-company.com/api/monitoring/" + CREATED_ITEM_DTO.id, UPDATE_ITEM_DTO)
            },
            {
                label: "DELETE / REST",
                route: "/api/monitoring/" + CREATED_ITEM_DTO.id,
                description: "Performs a HTTP REST operation with the DELETE method and returns the response depending on the state of the remote data storage.",
                id: randomId(),
                invoker: ()=> this.http.delete<any>("https://my-awsome-company.com/api/monitoring/" + CREATED_ITEM_DTO.id)
            },
            {
                label: "POST / Form Data",
                route: "/api/monitoring/login/",
                description: "Performs a HTTP operation with the POST method to send login form data.",
                id: randomId(),
                invoker: ()=> {
                    const body: FormData = new FormData();
                    body.append('email', EMAIL_SAMPLE);
                    body.append('password', VALID_PASSWORD);
                    return this.http.post<any>("https://my-awsome-company.com/api/monitoring/login/", body);
                }
            },
            {
                label: "POST / Form Data / Error",
                route: "/api/monitoring/login/",
                description: "Performs a HTTP operation with the POST method to send login form data and return an error.",
                id: randomId(),
                invoker: ()=> {
                    const body: FormData = new FormData();
                    body.append('email', EMAIL_SAMPLE);
                    body.append('password', 'kaori');
                    return this.http.post<any>("https://my-awsome-company.com/api/monitoring/login/", body);
                }
            },
            {
                label: "POST / Upload File",
                route: "/api/monitoring/upload/",
                description: "Performs a HTTP operation with the POST method to upload a file.",
                id: randomId(),
                invoker: ()=> {
                    const body: FormData = new FormData();
                    const file = new File([TEXT_DATA], "lorem-ipsum.txt", {
                        type: "text/plain",
                    });
                    body.append('lorem-ipsum', file, "lorem-ipsum.txt");
                    return this.http.post<any>("https://my-awsome-company.com/api/monitoring/upload/", body);
                }
            },
            {
                label: "GET / JSON",
                route: "/api/monitoring/actors",
                description: "Performs a HTTP operation with the GET method and returns a JSON object with a complex structure.",
                id: randomId(),
                invoker: ()=> this.http.get<any>("https://my-awsome-company.com/api/monitoring/actors/")
            },
            {
                label: "GET / JSON / Parameters",
                route: "/api/monitoring/actors/?age=53",
                description: "Performs a HTTP operation with the GET method and returns a JSON object.",
                id: randomId(),
                invoker: ()=> this.http.get<any>("https://my-awsome-company.com/api/monitoring/actors/?age=53")
            },
            {
                label: "GET / Text",
                route: "/api/monitoring/data-types/text/",
                description: "Performs a HTTP operation with the GET method and returns a text file.",
                id: randomId(),
                invoker: ()=> {
                    const httpOptions: any = {
                        headers: new HttpHeaders(),
                        responseType: 'text'
                      };
                    return this.http.get<string>("https://my-awsome-company.com/api/monitoring/data-types/text/", httpOptions)
                }
            },
            {
                label: "GET / Blob",
                route: "/api/monitoring/data-types/png/",
                description: "Performs a HTTP operation with the GET method and returns a png image as a Blob.",
                id: randomId(),
                invoker: ()=> {
                    const httpOptions: any = {
                        headers: new HttpHeaders(),
                        responseType: 'blob'
                      };
                    return this.http.get<string>("https://my-awsome-company.com/api/monitoring/data-types/png/", httpOptions)
                }
            },
            {
                label: "GET / ArrayBuffer",
                route: "/api/monitoring/data-types/binary/",
                description: "Performs a HTTP operation with the GET method and returns an ArrayBuffer object.",
                id: randomId(),
                invoker: ()=> {
                    const httpOptions: any = {
                        headers: new HttpHeaders(),
                        responseType: 'arraybuffer'
                      };
                    return this.http.get<string>("https://my-awsome-company.com/api/monitoring/data-types/binary/", httpOptions)
                }
            },


            {
                label: "GET / PHP Error",
                route: "/api/monitoring/php-error/",
                description: "Performs a HTTP operation with the GET method and returns a PHP error document.",
                id: randomId(),
                invoker: ()=> {
                    return this.http.get<string>("https://my-awsome-company.com/api/monitoring/php-error/")
                }
            }
        ];
    }
}