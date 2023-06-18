import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { CodeWrapper } from '../../ui/model/business/code-wrapper';

@Component({
  selector: 'scroll-service',
  templateUrl: './scroll-service.component.html',
  styleUrls: ['./scroll-service.component.scss']
})
export class ScrollServiceComponent implements OnDestroy {

  constructor(breadcrumb: BreadcrumbService) {
  breadcrumb.removeAll()
      .addItem(breadcrumb.buildItem("Demo"))
      .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  public title: string = "Scroll Service Demo";
  public presentation: string = "A lightweight service that provides scrolling implementation for your Angular application.";
  public srcCode: CodeWrapper = {
    html: ``,
    css: ``,
    ts: ``
  };

  public ngOnDestroy(): void {
  }
}
