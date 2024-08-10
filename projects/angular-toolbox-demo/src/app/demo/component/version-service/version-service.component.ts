/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { VersionService } from 'projects/angular-toolbox/src/public-api';
import { CodeWrapper } from '../../../ui/model/business/code-wrapper';
import { DatePipe } from '@angular/common';
import { DemoComponent } from '../../../ui/component/demo/demo.component';
import { DocumentationLink } from '../../../ui/model/business/documentation-link';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { AngularToolboxVersionService } from 'projects/angular-toolbox/src/lib/model/service/version/angular-toolbox-version.service';

@Component({
  selector: 'app-version-service',
  standalone: true,
  imports: [
    DemoComponent,
    DatePipe
  ],
  providers: [
    AngularToolboxVersionService
  ],
  templateUrl: './version-service.component.html'
})
export class VersionServiceComponent {

  constructor(public appVersionService: VersionService,
              public versionService: AngularToolboxVersionService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Demo", "/demo"))
              .addItem(breadcrumb.buildItem("Version Service"));
  }


  protected documentation: DocumentationLink = {
    label: "Version Service",
    commands: ['/resources', 'documentation', 'version-service']
  };
  protected title: string = "Version Service Demo";
  protected presentation: string = "A lightweight service that provides Semantic Versionning implementation for your Angular projects.";
  protected srcCode: CodeWrapper = {
    html: [`<h5>Angular Toolbox Library:</h5>
<ul>
  <li>Version: {{ versionService.getVersion().toString() }} </li>
  <li>Build Release: {{ versionService.getBuildTimestamp().toString() }} </li>
</ul>
<h5>Angular Toolbox Demo App:</h5>
<ul>
  <li>Version: {{ appVersionService.getVersion().toString() }} </li>
  <li>Build Release: {{ appVersionService.getBuildTimestamp().toString() }} </li>
</ul>`],
    typescript: [`/////////////////////////
// Application Module
/////////////////////////

@NgModule({
  declarations: [],
  providers: [
    { provide: VERSION_CONFIG, useValue: { major: 1, minor: 0, patch: 0 } }
  ],
  exports: []
})
export class AppModule { }
`, `/////////////////////////
// Component class
/////////////////////////

export class VersionServiceComponent {
    constructor(public versionService: AngularToolboxVersionService,
                public appVersionService: VersionService) {}
}`]
  };
}
