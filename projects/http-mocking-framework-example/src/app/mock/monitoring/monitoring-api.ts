/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpClient } from "@angular/common/http";
import { Uuid } from "projects/angular-toolbox/src/public-api";
import { Observable } from "rxjs";
import { TOKEN } from "./http-mock-data";

export interface MonitoringApiDescriptor {
    label: string,
    description: string,
    id: Uuid,
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
                label: "Basic GET",
                description: "Performs a basic HTTP call with the GET method and returns a successful response status code without any body content attached.",
                id: Uuid.build(),
                invoker: ()=> this.http.get("https://my-awsome-company.com/api/monitoring")
            },
            {
                label: "Basic POST",
                description: "Performs a basic HTTP call with the POST method and returns a successful response status code with a body content attached.",
                id: Uuid.build(),
                invoker: ()=> this.http.post<any>("https://my-awsome-company.com/api/monitoring", TOKEN)
            }
        ];
    }
}