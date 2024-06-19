import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';
import { ScrollService, SubscriptionService } from 'angular-toolbox';


const COMP_REF: string = "ScrollServiceComponent";

@Component({
  selector: 'scroll-service',
  templateUrl: './scroll-service.component.html',
  styleUrls: ['./scroll-service.component.scss']
})
export class ScrollServiceComponent implements OnInit, OnDestroy {

  constructor(breadcrumb: BreadcrumbService,
              private _scrollService: ScrollService,
              private _subscription: SubscriptionService) {
     breadcrumb.removeAll()
      .addItem(breadcrumb.buildItem("Demo"))
      .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  public title: string = "Scroll Service Demo";
  public presentation: string = "A lightweight service that provides scrolling capabilities to your Angular application.";
  public srcCode: CodeWrapper = {
    html: ["<div>Window scrollY position: {{ scrollY }}</div>"],
    ts: ["this.scrollService.onScroll.subscribe((e)=> this.scrollY = (e.currentTarget as Window).scrollY);"]
  };

  public scrollY: number = 0;

  public ngOnInit(): void {
    this._subscription.register(COMP_REF,
      this._scrollService.onScroll.subscribe((e)=> this.scrollY = (e.currentTarget as Window).scrollY)
    );
  }

  public ngOnDestroy(): void {
    this._subscription.clearAll(COMP_REF);
  }
}
