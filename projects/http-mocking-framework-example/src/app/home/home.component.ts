/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';
import { AngularToolboxCodeViewportComponent, AngularToolboxGitSectionComponent, AngularToolboxHrComponent, AngularToolboxIconListComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AngularToolboxGitSectionComponent,
    NavigateToUrlDirective,
    AngularToolboxCodeViewportComponent,
    AngularToolboxPageTitleComponent,
    AngularToolboxIconListComponent,
    AngularToolboxHrComponent,
    AngularToolboxGitSectionComponent,
    RouterModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
