/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { AngularToolboxGitSectionComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    RouterModule,
    AngularToolboxGitSectionComponent,
    AngularToolboxPageTitleComponent
  ],
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
