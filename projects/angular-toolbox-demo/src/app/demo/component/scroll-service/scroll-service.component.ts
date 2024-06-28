/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { ScrollService, SubscriptionService } from 'angular-toolbox';
import { DemoComponent } from '../../../ui/component/demo/demo.component';

@Component({
  selector: 'scroll-service',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './scroll-service.component.html'
})
export class ScrollServiceComponent implements OnInit, OnDestroy {

  constructor(breadcrumb: BreadcrumbService,
              private _scrollService: ScrollService,
              private _subscription: SubscriptionService) {
     breadcrumb.removeAll()
      .addItem(breadcrumb.buildItem("Demo"))
      .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

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
