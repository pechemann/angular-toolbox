/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { NavbarComponent } from 'projects/angular-toolbox/src/public-api';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-navbar-demo',
  imports: [
    DemoComponent,
    NavbarComponent
  ],
  templateUrl: './navbar-demo.component.html',
  styleUrl: './navbar-demo.component.scss'
})
export class NavbarDemoComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("ATX Navbar"));
  }

  protected documentation: DocumentationLink = {
    label: "ATX Navbar",
    commands: ['/resources', 'documentation', 'navbar-component']
  };

  protected title: string = "ATX Navbar Demo (Experimental)";
  protected presentation: string = 'A responsive navigation header that includes support for branding, navigation and mobile collapsing menu.<br>This component is part of the <a href="javascript:appBridge.navigate([\'resources/documentation/laf-less-components\'])" title="LAF-less API">LAF-less API</a>.';
  protected srcCode: CodeWrapper = {
    html: [`<atx-navbar class="border bg-light p-2 rounded">
    <div brand>
        <a href="./" class="h1">Brand</a>
    </div>
    <li>
        <a href="./" class="active">Home</a>
    </li>
    <li>
        <a href="./news">News</a>
    </li>
    <li>
        <a href="./about">About</a>
    </li>
    <li>
        <a href="./contact">Contact</a>
    </li>
    <div icon>
        <i class="bi bi-list"></i>
    </div>
</atx-navbar>`],
    css: [`::ng-deep {
  a:not(.active) {
      text-decoration: none;
  }
}`],
    typescript: [`@Component({
  selector: 'navbar-demo',
  standalone: true,
  imports: [ NavbarComponent ],
  templateUrl: './navbar-demo.component.html'
})
export class NavbarDemoComponent {}`]
  };
}
