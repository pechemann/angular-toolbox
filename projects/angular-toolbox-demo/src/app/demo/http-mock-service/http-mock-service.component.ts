import { Component } from '@angular/core';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HttpMockService } from 'projects/angular-toolbox/src/public-api';
import { config } from './http-mock-config';

@Component({
  selector: 'app-http-mock-service',
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent {

  protected data!: string;

  constructor(private _http: HttpClient,
              private _httpMockService: HttpMockService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("HTTP Mock Service"));
    this._httpMockService.setConfig(config);
  }

  public title: string = "HTTP Mock Service Demo";
  public presentation: string = "A lightweight service that provides Mocking strategies for developing HTTP-based components in your Angular projects.";
  public srcCode: CodeWrapper = {
    html: [`...
  <button class="btn btn-primary" role="button" (click)="loadData()">Load Data</button>

  <h6  class="card-title">Loaded Data</h6>
  <hr>

  @if (data) { <code>{{ data }}</code> }
  @else { <p>No data loaded...<p/> }
...`],
    ts: [
`/////////////////////////
// HTTP Mock Config
/////////////////////////

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "angular-toolbox";
import { User } from "./business";

const USER: User = {
    userId: 3,
    id: 3,
    title: "lorem ipsum",
    completed: true
};

export const config: HttpMockConfig = {
    routes: [
        {
            path: "https://jsonplaceholder.typicode.com/todos/:id",
            get: {
                data: (req: HttpRequest<any>)=> httpResponseMock().body(USER)
                                                                  .response(),
                error: (req: HttpRequest<any>)=> httpResponseMock().status(HttpStatusCode.NotFound)
                                                                   .statusText("Not Found")
                                                                   .response()
            }
        }
    ]
}`,
`/////////////////////////
// HTTP Mock Config
/////////////////////////

@Component({
  selector: 'app-http-mock-service',
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent {

  protected data!: string;

  constructor(private _http: HttpClient) {}

  protected loadData(): void {
    this._http.get("https://jsonplaceholder.typicode.com/todos/3").subscribe((result: any)=> {
      this.data = JSON.stringify(result, null, 4);
    });
  }
}`,
`/////////////////////////
// Application module
/////////////////////////

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XhrFactory } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-layout/app.component';
import { AngularToolboxModule, xhrProxyFactory } from 'angular-toolbox';

//=> HTTP mock config import
import { config } from './http-mock-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    //=> HTTP mock framework initialization
    { provide: XhrFactory, useFactory: xhrProxyFactory },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToolboxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(httpMockService: HttpMockService) {
    //=> HTTP mock config initialization
    httpMockService.setConfig(config);
  }
}`
]
  };

  protected loadData(): void {
    this._http.get("https://jsonplaceholder.typicode.com/todos/3").subscribe((result: any)=> {
      this.data = JSON.stringify(result, null, 4);
    });
  }
}
