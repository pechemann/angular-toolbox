/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../../ui/component/git-section/git-section.component';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    RouterModule,
    GitSectionComponent,
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
