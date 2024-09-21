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
import { DropdownComponent, DropdownHorizontalPosition, DropdownVerticalPosition } from 'projects/angular-toolbox/src/public-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dropdown-demo',
  standalone: true,
  imports: [
    DemoComponent,
    DropdownComponent,
    FormsModule
  ],
  templateUrl: './dropdown-demo.component.html',
  styleUrls: ['./dropdown-demo.component.scss']
})
export class DropdownDemoComponent {

  protected vPos: DropdownVerticalPosition = "bottom";
  protected hPos: DropdownHorizontalPosition = "left";

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Dropdown Container"));
  }

  protected documentation: DocumentationLink = {
    label: "Dropdown Container",
    commands: ['/resources', 'documentation', 'dropdown-container']
  };
  protected title: string = "Dropdown Container Demo";
  protected presentation: string = 'A container that allows Users to toggle the display of specified content by clicking a button.<br>This component is part of the <a href="javascript:appBridge.navigate([\'resources/documentation/laf-less-components\'])" title="LAF-less API">LAF-less API</a>.';
  protected srcCode: CodeWrapper = {
    html: [`<atx-dropdown buttonClass="btn btn-primary">
    <!-- button display -->
    <i class="bi bi-check2-circle"></i> Select item
    <!-- dropdown content -->
    <ul class="list-group shadow" content>
        <li class="list-group-item list-group-item-action" role="button">A first item</li>
        <li class="list-group-item list-group-item-action" role="button">A second item</li>
        <li class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled item</li>
    </ul>
</atx-dropdown>`]
  };
}
