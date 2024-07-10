/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { IdentifiableComponent, SubscriptionService } from 'projects/angular-toolbox/src/public-api';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-subscription-service-demo',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './subscription-service-demo.component.html'
})
export class SubscriptionServiceComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  protected eventEmiter_1: EventEmitter<string> = new EventEmitter<string>();
  protected eventEmiter_2: EventEmitter<string> = new EventEmitter<string>();
  protected eventList: string[] = [];
  private _event1_Idx: number = 1;
  private _event2_Idx: number = 1;

  constructor(private _subscriptionService: SubscriptionService,
              breadcrumb: BreadcrumbService) {
    super();
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Subscription Service"));
  }

  protected documentation: DocumentationLink = {
    label: "Subscription Service",
    commands: ['/resources', 'documentation', 'subscription-service']
  };
  protected title: string = "Subscription Service Demo";
  protected presentation: string = "A lightweight service that provides easy-to-use functionalities for managing observable subscriptions.";
  protected srcCode: CodeWrapper = {
    html: [`<button type="button" class="btn btn-outline-primary" (click)="eventEmiter_1.emit('Event #1 - idx: ')">EventEmitter #1</button>
<button type="button" class="btn btn-outline-primary" (click)="eventEmiter_2.emit('Event #2 - idx: ')">EventEmitter #2</button>
<button type="button" (click)="ngOnDestroy()">Unsubscribe</button>

<ul class="list-group list-group-flush">
    @for (item of eventList; track item) {
        <li class="list-group-item">{{ item }}</li>
    }
</ul>`]
    ,
    typescript: [`export class SubscriptionServiceComponent implements OnInit, OnDestroy {

  protected eventEmiter_1: EventEmitter<string> = new EventEmitter<string>();
  protected eventEmiter_2: EventEmitter<string> = new EventEmitter<string>();
  protected eventList: string[] = [];
  private _event1_Idx: number = 1;
  private _event2_Idx: number = 1;

  constructor(private _subscriptionService: SubscriptionService) {}

  public ngOnInit(): void {
    this._subscriptionService.register(this,
      this.eventEmiter_1.subscribe(next => this.eventList.push(next + this._event1_Idx++))
    ).append(
      this.eventEmiter_2.subscribe(next => this.eventList.push(next + this._event2_Idx++))
    );
  }

  public ngOnDestroy(): void {
    this._subscriptionService.clearAll(this);
  }
}`]
  };

  public ngOnInit(): void {
    this._subscriptionService.register(this,
      this.eventEmiter_1.subscribe(next => this.eventList.push(next + this._event1_Idx++))
    ).append(
      this.eventEmiter_2.subscribe(next => this.eventList.push(next + this._event2_Idx++))
    );
  }

  public ngOnDestroy(): void {
    this._subscriptionService.clearAll(this);
  }
}
