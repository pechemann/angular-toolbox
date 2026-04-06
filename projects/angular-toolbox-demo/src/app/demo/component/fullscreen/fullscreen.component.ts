/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { FullscreenService } from 'projects/angular-toolbox/src/public-api';

const page1: string[] = [ "Presentation" ];
const page2: string[] = [ "Resources", "Documentation" ];
const page3: string[] = [ "Contact" ];

@Component({
    selector: 'app-fullscreen',
    imports: [
        DemoComponent
    ],
    templateUrl: './fullscreen.component.html'
})
export class FullscreenComponent {

  constructor(breadcrumb: BreadcrumbService,
              public fullscreenService: FullscreenService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Fullscreen Service"));
  }

  protected documentation: DocumentationLink = {
    label: "Fullscreen Service",
    commands: ['/resources', 'documentation', 'fullscreen-service']
  };
  protected title: string = "Fullscreen Service Demo";
  protected presentation: string = "The Fullscreen Service provides a simple way to manage applications fullscreen mode.";
  protected srcCode: CodeWrapper = {
    html: [`<button class="btn btn-primary" (click)="fullscreenService.toggleFullscreenMode()">
  @if (fullscreenService.isFullscreenModeActive) {
    <i class="bi bi-fullscreen-exit"></i>
  } @else {
    <i class="bi bi-fullscreen"></i>
  }
  Toggle Fullscreen Mode
</button>`],
    typescript: [`export class AppComponent {
    constructor(public fullscreenService: FullscreenService) { }
}`]
  };
}
