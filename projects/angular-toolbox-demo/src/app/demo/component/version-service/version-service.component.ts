/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { VersionService } from 'angular-toolbox';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DatePipe } from '@angular/common';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';

@Component({
  selector: 'app-version-service',
  standalone: true,
  imports: [
    DemoComponent,
    DatePipe
  ],
  templateUrl: './version-service.component.html'
})
export class VersionServiceComponent {

  constructor(public versionService: VersionService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo"))
              .addItem(breadcrumb.buildItem("Version Service"));
  }


  protected documentation: DocumentationLink = {
    label: "Version Service",
    commands: ['/resources', 'documentation', 'version-service']
  };
  protected title: string = "Version Service Demo";
  protected presentation: string = "A lightweight service that provides Semantic Versionning implementation for your Angular projects.";
  protected srcCode: CodeWrapper = {
    html: [`<p>Current Angular Toolbox Version: {{ versionService.getVersion().toString() }}</p>
<p>Build Release Date: {{ versionService.getBuildTimestamp() | date }}</p>`],
    typescript: [`/////////////////////////
// Application Module
/////////////////////////

@NgModule({
  declarations: [],
  providers: [
    { provide: VERSION_CONFIG, useValue: { major: 0, minor: 1, patch: 0 } }
  ],
  exports: []
})
export class AppModule { }
`, `/////////////////////////
// Component class
/////////////////////////

export class VersionServiceComponent {
    constructor(public versionService: VersionService) {}
}`]
  };
}
