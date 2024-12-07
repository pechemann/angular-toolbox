/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy } from '@angular/core';
import { WindowInit, WindowService } from 'projects/angular-toolbox/src/public-api';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { WindowContentComponent } from './window-content.component';

@Component({
    selector: 'app-window-service',
    imports: [
        DemoComponent,
    ],
    templateUrl: './window-service.component.html'
})
export class WindowServiceComponent implements OnDestroy {

  constructor(private windowService: WindowService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Window Service"));
  }

  public ngOnDestroy(): void {
    this.windowService.closeAll();
  }

  protected openWindow(): void {
    const init: WindowInit = {
      title: "Dynamic Component",
      center: true
    };
    this.windowService.open(WindowContentComponent, init);
  }

  protected documentation: DocumentationLink = {
    label: "Window Managment API",
    commands: ['/resources', 'documentation', 'window-managment-api']
  };
  protected title: string = "Window Service Demo";
  protected presentation: string = "A lightweight service for creating browser windows that render Angular components.";
  protected srcCode: CodeWrapper = {
    html: [`<button (click)="openWindow()">Open new window</button>`],
    typescript: [`/////////////////////////
// Main Component
/////////////////////////

@Component({
  selector: 'app-window-service',
  standalone: true,
  templateUrl: './window-service.component.html'
})
export class WindowServiceComponent implements OnDestroy {
  constructor(private windowService: WindowService) {}

  public ngOnDestroy(): void {
    this.windowService.closeAll();
  }

  protected openWindow(): void {
    const init: WindowInit = {
      title: "Dynamic Component",
      center: true
    };
    this.windowService.open(WindowContentComponent);
  }
}
`, `/////////////////////////
// Dynamic Component
/////////////////////////

@Component({
  selector: 'app-window-content',
  standalone: true,
  template: '<div>Angular Toolbox rocks!</div>'
})
export class WindowContentComponent {}`]
  };
}
