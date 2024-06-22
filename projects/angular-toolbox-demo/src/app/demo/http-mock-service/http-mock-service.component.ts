import { Component, OnDestroy } from '@angular/core';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import { config } from './http-mock-config';
import { SubscriptionService, HttpMockService } from 'angular-toolbox';

const COMP_REF: string = "HttpMockServiceComponent";

@Component({
  selector: 'app-http-mock-service',
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent implements OnDestroy {

  protected data!: string;
  protected todoIdx: number = 0;

  constructor(private _http: HttpClient,
              private _httpMockService: HttpMockService,
              private _subscription: SubscriptionService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("HTTP Mock Service"));
    this._httpMockService.setConfig(config);
  }

  public title: string = "HTTP Mock Service Demo";
  public presentation: string = "A lightweight service that provides Mocking strategies for developing HTTP-based components in your Angular projects.";
  public srcCode: CodeWrapper = {
    html: [` <button role="button" (click)="loadData()">Load Data</button>

  @if (data) {
      <h6>Loaded data for ID #{{todoIdx}}</h6>
      <hr>
      <code>{{ data }}</code>
  } @else {
      No data loaded...
  }`],
    ts: [
`/////////////////////////
// HTTP Mock Config
/////////////////////////

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "angular-toolbox";
import { Todo } from "./model/business";

const getTodo = (params: any): Todo => {
    return {
        id: params.id,
        userId: 1,
        title: getRandomString(4),
        completed: Math.random() < 0.4
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
                        data: (req: HttpRequest<any>, params: any)=> httpResponseMock().body( getTodo(params) )
                                                                                       .response()
                    }
                }
            ]
        }
    ]
};`,
`/////////////////////////
// Sample Component
/////////////////////////

@Component({
  selector: 'app-http-mock-service',
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent {

  protected data!: string;
  protected userIdx: number = 0;

  constructor(private _http: HttpClient) {}

  protected loadData(): void {
    const url: string = "https://jsonplaceholder.typicode.com/todos/" + ++this.userIdx;
    this._http.get(url).subscribe((result: Todo)=> {
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
import { AngularToolboxModule, httpMockFactory } from 'angular-toolbox';

//=> HTTP mock config import
import { config } from './app-mock/http-mock-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    //=> HTTP mock framework initialization
    { provide: XhrFactory, useFactory: httpMockFactory },
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
    const url: string = "https://jsonplaceholder.typicode.com/todos/" + ++this.todoIdx;
    this._subscription.register(COMP_REF,
      this._http.get(url).subscribe((result: any)=> {
        this.data = JSON.stringify(result, null, 4);
      })
    );
  }
  
  public ngOnDestroy(): void {
    this._subscription.clearAll(COMP_REF);
  }
}
