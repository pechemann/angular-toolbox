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
import { AngularToolboxVersionService } from 'projects/angular-toolbox/src/lib/model/service/version/angular-toolbox-version.service';
import { BorderLayout, BorderLayoutContainer } from 'projects/angular-toolbox/src/public-api';

@Component({
  selector: 'app-border-layout-demo',
  standalone: true,
  imports: [
    DemoComponent,
    BorderLayout,
    BorderLayoutContainer
  ],
  providers: [
    AngularToolboxVersionService
  ],
  templateUrl: './border-layout-demo.component.html',
  styleUrls: ['./border-layout-demo.component.scss']
})
export class BorderLayoutDemoComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("BorderLayout Component"));
  }


  /*protected documentation: DocumentationLink = {
    label: "Border Layout",
    commands: ['/resources', 'documentation', 'border-layout']
  };*/
  protected title: string = "BorderLayout Component Demo";
  protected presentation: string = "A container that arranges and resizes its components to fit in five regions: north, south, east, west, and center.";
  protected srcCode: CodeWrapper = {
    html: [`<div class="wrapper w-100">
    <atx-border-layout>
        <atx-border-layout-container [constraints]="{ region: 'north', size: 80 }">
            <div class="h-100">
                <button class="btn btn-secondary w-100 h-100">North<br><em>(button)</em></button>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'west' }">
            <div class="border h-100 p-1 bg-light">
                <h6>West</h6>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'center' }">
            <div class="border h-100 p-1 bg-info-subtle">
                <h6>Center</h6>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'east', resizable: true, size: 250, maxSize: 400, minSize: 140 }">
            <div class="border h-100 p-1 bg-light">
                <h6>East</h6>
                <em>(resizable panel)</em>
            </div>
        </atx-border-layout-container>
        <atx-border-layout-container [constraints]="{ region: 'south', resizable: true, size: 150, maxSize: 250, minSize: 60 }">
            <div class="border h-100 p-1 bg-body-secondary">
                <h6>South</h6>
                <em>(resizable panel)</em>
            </div>
        </atx-border-layout-container>
    </atx-border-layout>
</div>`],
  css: [`.wrapper {
  height: 500px;
  --atx-handle-color: orange;
}`]
  };
}
