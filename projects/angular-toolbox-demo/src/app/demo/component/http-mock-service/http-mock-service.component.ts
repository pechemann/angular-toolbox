/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, OnDestroy } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { HttpClient } from '@angular/common/http';
import { config } from './http-mock-config';
import { SubscriptionService, HttpMockService, AbstractIdentifiable } from 'angular-toolbox';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { RouterModule } from '@angular/router';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';

@Component({
  selector: 'app-http-mock-service',
  standalone: true,
  imports: [
    DemoComponent,
    RouterModule
  ],
  templateUrl: './http-mock-service.component.html'
})
export class HttpMockServiceComponent extends AbstractIdentifiable implements OnDestroy {

  protected data!: string;
  protected todoIdx: number = 0;

  constructor(private _http: HttpClient,
              private _httpMockService: HttpMockService,
              private _subscription: SubscriptionService,
              breadcrumb: BreadcrumbService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("HTTP Mock Service"));
    this._httpMockService.addConfig(config);
  }

  protected documentation: DocumentationLink = {
    label: "Angular Toolbox HTTP Mocking Framework",
    commands: ['/resources', 'documentation', 'http-mocking-framework']
  };
  protected title: string = "HTTP Mock Service Demo";
  protected presentation: string = "A lightweight service that provides Mocking strategies for developing HTTP-based components in your Angular projects.";
  protected srcCode: CodeWrapper = {
    html: [` <button role="button" (click)="loadData()">Load Data</button>

  @if (data) {
      <h6>Loaded data for ID #{{todoIdx}}</h6>
      <hr>
      <code>{{ data }}</code>
  } @else {
      No data loaded...
  }`],
    typescript: [
`/////////////////////////
// HTTP Mock Config
/////////////////////////

import { HttpRequest, HttpStatusCode } from "@angular/common/http";
import { HttpMockConfig, httpResponseMock } from "angular-toolbox";
import { Todo } from "../model/business";
import { getTodo } from '../app-mock/http-mock-util';

export const config: HttpMockConfig = {
    origin: "https://jsonplaceholder.typicode.com",
    interceptors: [
        {
            id: "getTodo",
            endpoints: [
                {
                    route: "/todos/:id",
                    get: {
                        data: (req: HttpRequest<any>, params: any)=>
                              httpResponseMock().body(getTodo(params)).response();
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
    const url: string = \u0060https://jsonplaceholder.typicode.com/todos/$\u007B++this.userIdx\u007D\u0060;
    //--> You should use the SubscriptionService to wrap HTTP calls:
    this._http.get(url).subscribe((result: any)=> this.data = JSON.stringify(result, null, 4));
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
import { HttpMockService, httpMockFactory } from 'angular-toolbox';

//=> HTTP mock config import
import { config } from './app-mock/http-mock-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    //--> HTTP mock framework initialization
    { provide: XhrFactory, useFactory: httpMockFactory },
    provideHttpClient(),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(httpMockService: HttpMockService) {
    //--> HTTP mock config initialization
    httpMockService.addConfig(config);
  }
}`,
`/////////////////////////
// HTTP Mock Util
/////////////////////////

import { Todo } from "./model/business";

const loremIpsum: string[] = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore'
];

const getRandomString = (size: number, isFirst: boolean = true): string => {
  let result: string = loremIpsum[Math.floor(Math.random()* loremIpsum.length)];
  if (size > 1) result += " " + getRandomString(--size, false);
  if (isFirst) return result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};

const getRandomBoolean = (): boolean => Math.random() < 0.4;

export const getTodo = (params: any): Todo => {
  return {
      id: params.id,
      userId: 1,
      title: getRandomString(4),
      completed: getRandomBoolean()
  }
};`
]
  };

  protected loadData(): void {
    const url: string = `https://jsonplaceholder.typicode.com/todos/${++this.todoIdx}`;
    this._subscription.register(this,
      this._http.get(url).subscribe((result: any)=> this.data = JSON.stringify(result, null, 4))
    );
  }
  
  public ngOnDestroy(): void {
    this._httpMockService.clearConfigs();
    this._subscription.clearAll(this);
  }
}
