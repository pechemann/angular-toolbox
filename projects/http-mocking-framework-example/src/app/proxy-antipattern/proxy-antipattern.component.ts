/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { MESSAGE_PROXY_MOCK_CONFIG } from '../mock/proxy-antipattern/http-mock-config';
import { HttpMock, HttpMockService, IdentifiableComponent, SubscriptionService } from 'projects/angular-toolbox/src/public-api';

@HttpMock(MESSAGE_PROXY_MOCK_CONFIG)
@Component({
    selector: 'app-proxy-antipattern',
    imports: [
        AngularToolboxPageTitleComponent
    ],
    templateUrl: './proxy-antipattern.component.html',
    styleUrl: './proxy-antipattern.component.scss'
})
export class ProxyAntipatternComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  protected message: any = null;
  protected error: HttpErrorResponse | null = null;

  constructor(breadcrumb: BreadcrumbService,
              private http: HttpClient,
              private subscriptionService: SubscriptionService,
              private mockService: HttpMockService) {
    super();
    breadcrumb.removeAll().addItem(breadcrumb.buildItem("Proxy Antipattern Sample Application"));
  }

  protected getValidMessage(): void {
    this.clearResponses();
    this.subscriptionService.register(this,
      this.http.get<any>("https://my-awsome-company.com/api/message?id=0")
              .subscribe({
                  next: (message: any)=> this.message = JSON.stringify(message),
                  error: (err: HttpErrorResponse)=> this.error = err
              })
    );
  }

  protected getInvalidMessage(): void {
    this.clearResponses();
    this.subscriptionService.register(this,
      this.http.get<any>("https://my-awsome-company.com/api/message?id=1")
              .subscribe({
                  next: (message: any)=> this.message = null,
                  error: (err: HttpErrorResponse)=> this.error = err
                })
    );
  }

  protected postValidMessage(): void {
    this.clearResponses();
    const message: any = { msg: "Hello world!" };
    this.subscriptionService.register(this,
      this.http.post<any>("https://my-awsome-company.com/api/message", message)
              .subscribe({
                  next: (message: any)=> this.message = message,
                  error: (err: any)=> this.error = err
                })
    );
  }

  protected postInvalidMessage(): void {
    this.clearResponses();
    this.subscriptionService.register(this,
      this.http.post<any>("https://my-awsome-company.com/api/message", { })
              .subscribe({
                  next: (message: any)=> this.message = null,
                  error: (err: any)=> this.error = err
                })
    );
  }

  public ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.subscriptionService.clearAll(this);
  }

  private clearResponses(): void {
    this.error = this.message = null;
  }
}
