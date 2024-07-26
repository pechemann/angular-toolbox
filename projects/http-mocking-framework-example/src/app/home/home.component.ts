/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'projects/angular-toolbox/src/public-api';
import { BreadcrumbService, IconListItem, AngularToolboxCodeViewportComponent, AngularToolboxGitSectionComponent, AngularToolboxHrComponent, AngularToolboxIconListComponent, AngularToolboxPageTitleComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
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

  protected homelinks: IconListItem[] = [
    { label: "SayHello Sample Application", urlTree: ["../say-hello"] },
    { label: "SayHello Sample Application Video (YouTube)", url: "https://youtu.be/zN0SEgovFbc?si=LOFZJ9vkNAf3rNcz" },
    { label: "Proxy Antipattern", urlTree: ["../proxy-antipattern"] },
    { label: "Proxy Antipattern Video (YouTube)" },
    { label: "HTTP Mocking Framework Documentation (Online)", url: "https://pascalechemann.com/angular-toolbox/resources/documentation/http-mocking-framework" }
  ];

  constructor(breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
