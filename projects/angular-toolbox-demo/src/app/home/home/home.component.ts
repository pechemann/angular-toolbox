/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { IconListService } from '../../ui/model/service/icon-list-list.service';
import { GitSectionComponent } from '../../ui/component/git-section/git-section.component';
import { AnchorLinklDirective } from 'angular-toolbox';
import { CodeViewportComponent } from '../../ui/component/code-viewport/code-viewport.component';
import { AngularToolboxIconListComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GitSectionComponent,
    AnchorLinklDirective,
    CodeViewportComponent,
    AngularToolboxPageTitleComponent,
    AngularToolboxIconListComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(public iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
