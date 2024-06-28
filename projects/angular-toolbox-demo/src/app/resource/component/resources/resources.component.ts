/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../ui/model/service/breadcrumb.service';
import { RouterModule } from '@angular/router';
import { GitSectionComponent } from '../../../ui/component/git-section/git-section.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    RouterModule,
    GitSectionComponent
  ],
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll()
              .addItem(breadcrumb.buildItem("Resources"));
  }
}
