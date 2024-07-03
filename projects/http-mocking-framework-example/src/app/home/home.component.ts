/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';
import { AngularToolboxCodeViewportComponent, AngularToolboxGitSectionComponent, AngularToolboxHrComponent, AngularToolboxIconListComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/service';
import { RouterModule } from '@angular/router';
import { IconListItem } from 'projects/angular-toolbox-demo-component-lib/src/lib/model/business';

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

  protected homelinks: IconListItem[] = [
    { label: "TODO Sample Application Deep Dive" },
    { label: "TODO Sample Application Video (YouTube)" },
    { label: "HTTP Mocking Framework Documentation (Online)", url: "https://pascalechemann.com/angular-toolbox/resources/documentation/http-mocking-framework" }
  ];

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
