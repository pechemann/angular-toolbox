/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { IconListService } from '../../ui/model/service/icon-list-list.service';
import { BreadcrumbService } from '../../ui/model/service/breadcrumb.service';
import { GitSectionComponent } from '../../ui/component/git-section/git-section.component';
import { IconListComponent } from '../../ui/component/icon-list/icon-list.component';
import { AnchorLinklDirective } from 'angular-toolbox';
import { CodeViewportComponent } from '../../ui/component/code-viewport/code-viewport.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IconListComponent,
    GitSectionComponent,
    AnchorLinklDirective,
    CodeViewportComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(public iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
