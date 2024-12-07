/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularToolboxGitSectionComponent, AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { AngularToolboxVersionService } from 'projects/angular-toolbox/src/public-api';

@Component({
    selector: 'app-resources',
    imports: [
        RouterModule,
        AngularToolboxGitSectionComponent,
        AngularToolboxPageTitleComponent
    ],
    providers: [
        AngularToolboxVersionService
    ],
    templateUrl: './resources.component.html'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService,
              protected versionService: AngularToolboxVersionService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
