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
import { BreadcrumbDemoService } from './breadcrumb-demo.service';

const page1: string[] = [ "Presentation" ];
const page2: string[] = [ "Resources", "Documentation" ];
const page3: string[] = [ "Contact" ];

@Component({
  selector: 'app-array-list',
  standalone: true,
  imports: [
    DemoComponent
  ],
  providers: [
    BreadcrumbDemoService
  ],
  templateUrl: './array-list.component.html'
})
export class ArrayListComponent {

  constructor(breadcrumb: BreadcrumbService,
              public breadcrumbDemoService: BreadcrumbDemoService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("ArrayList Class"));
  }

  protected documentation: DocumentationLink = {
    label: "ArrayList Class",
    commands: ['/resources', 'documentation', 'array-list-class']
  };
  protected title: string = "ArrayList Class Demo";
  protected presentation: string = "The ArrayList class provides a simple way to manage collections data-binding through Angular services.";
  protected srcCode: CodeWrapper = {
    html: [`<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
        @for (item of breadcrumbDemoService.toArray(); track item) {
            <li class="breadcrumb-item">{{ item }}</li>
        }
    </ol>
</nav>`],
    typescript: [`/////////////////////////
// BreadcrumbService
/////////////////////////

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService extends ArrayList<string> {
  constructor() {
    super();
  }
}
`, `/////////////////////////
// AppComponent class
/////////////////////////

export class AppComponent {
    constructor(public breadcrumbService: BreadcrumbService) {  }
}`,
`/////////////////////////////////
// DocumentationComponent class
/////////////////////////////////

export class DocumentationComponent {
    constructor(breadcrumbService: BreadcrumbService) {
      breadcrumbDemoService.removeAll().addAll([ "Resources", "Documentation" ]);
    }
}`]
  };

  protected pageChange(index: number): void {
    let pageItemList: string [] = page1;
    if (index === 2) pageItemList = page2;
    else if (index === 3) pageItemList = page3;
    this.breadcrumbDemoService.removeAll().addAll(pageItemList);
  }
}
