/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { IdentifiableComponent, ScrollService, SubscriptionService } from 'projects/angular-toolbox/src/public-api';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
    selector: 'scroll-service',
    imports: [
        DemoComponent
    ],
    templateUrl: './scroll-service.component.html'
})
export class ScrollServiceComponent extends IdentifiableComponent implements OnInit, OnDestroy {

  constructor(breadcrumb: BreadcrumbService,
              private _scrollService: ScrollService,
              private _subscription: SubscriptionService) {
    super();
    breadcrumb.removeAll()
      .addItem(breadcrumb.buildItem("Demo", "/demo"))
      .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  protected documentation: DocumentationLink = {
    label: "Scroll Service",
    commands: ['/resources', 'documentation', 'scroll-service']
  };
  protected title: string = "Scroll Service Demo";
  protected presentation: string = "A lightweight service that provides scrolling capabilities to your Angular application.";
  protected srcCode: CodeWrapper = {
    html: ["<div>Window scrollY position: {{ scrollY }}</div>"],
    typescript: ["this.scrollService.onScroll.subscribe((e)=> this.scrollY = (e.currentTarget as Window).scrollY);"]
  };

  protected scrollY: number = 0;

  public ngOnInit(): void {
    this._subscription.register(this,
      this._scrollService.onScroll.subscribe((e)=> this.scrollY = (e.currentTarget as Window).scrollY)
    );
  }

  public ngOnDestroy(): void {
    this._subscription.clearAll(this);
  }
}
