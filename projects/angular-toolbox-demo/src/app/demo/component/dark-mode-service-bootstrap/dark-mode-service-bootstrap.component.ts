/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { DarkModeService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';

@Component({
  selector: 'app-dark-mode-service-bootstrap',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './dark-mode-service-bootstrap.component.html'
})
export class DarkModeServiceBootstrapComponent {

  //--> Darkmode logic for this example is located in the AppComponent.
  constructor(public darkModeService: DarkModeService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Dark Mode Service"));
  }

  protected documentation: DocumentationLink = {
    label: "Dark Mode Service",
    commands: ['/resources', 'documentation', 'dark-mode-service']
  };
  protected title: string = "Dark Mode Service: Bootstrap Integration";
  protected presentation: string = "The following sample application shows how to easily integrate Bootstrap with the <code>DarkModeService</code> service.";
  protected srcCode: CodeWrapper = {
    html: [`<button (click)="darkModeService.toggleDarkMode()"> Toggle Dark Mode </button>`],
    typescript: [`export class DarkModeServiceBootstrapComponent {

  constructor(public darkModeService: DarkModeService,
              @Inject(DOCUMENT) doc: Document) {
    this.setDarkmodeState(darkModeService.darkModeEnabled(), doc);
    darkModeService.change.subscribe((isDarkMode: boolean)=> this.setDarkmodeState(isDarkMode, doc));
  }
  private setDarkmodeState(isDarkMode: boolean, doc: Document): void {
    doc.body.setAttribute("data-bs-theme", isDarkMode ? 'dark' : 'light');
  }
}`]
  };
}
