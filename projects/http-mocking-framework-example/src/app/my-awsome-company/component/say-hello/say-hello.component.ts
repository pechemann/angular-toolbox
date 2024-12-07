/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { EMPTY_STRING, HttpMock, HttpMockService, IdentifiableComponent, SubscriptionService } from 'projects/angular-toolbox/src/public-api';
import { SayHelloDto } from '../../model/business/say-hello.dto';
import { SAY_HELLO_MOCK_CONFIG } from '../../../mock/say-hello/http-mock-config';
import { FormsModule } from '@angular/forms';

@HttpMock(SAY_HELLO_MOCK_CONFIG)
@Component({
    selector: 'app-say-hello',
    imports: [
        AngularToolboxPageTitleComponent,
        FormsModule
    ],
    templateUrl: './say-hello.component.html'
})
export class SayHelloComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  protected nameInput: string = EMPTY_STRING;
  protected httpResponse!: string;
  protected error: boolean = false;

  constructor(breadcrumb: BreadcrumbService,
              private http: HttpClient,
              private subscriptionService: SubscriptionService,
              private mockService: HttpMockService) {
    super();
    breadcrumb.removeAll().addItem(breadcrumb.buildItem("Say Hello! Sample Application"));
  }

  protected sendMessage(event: Event): void {
    event.preventDefault();
    this.error = false;
    this.subscriptionService.register(this,
      this.http.get<SayHelloDto>("https://my-awsome-company.com/api/sayHello/" + this.nameInput)
               .subscribe({
                  next: (response: SayHelloDto) => this.httpResponse = response.message,
                  error: (e) => this.error = true
               })
    );
  }

  public ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.subscriptionService.clearAll(this);
  }
}
