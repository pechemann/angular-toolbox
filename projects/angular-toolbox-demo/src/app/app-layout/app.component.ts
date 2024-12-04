/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularToolboxBreadcrumbComponent, AngularToolboxDarkModeComponent, AngularToolboxFooterComponent, AngularToolboxHeaderComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { DialogOutlet } from 'projects/angular-toolbox/src/lib/framework/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    DialogOutlet,
    AngularToolboxHeaderComponent,
    AngularToolboxFooterComponent,
    AngularToolboxDarkModeComponent,
    AngularToolboxBreadcrumbComponent
  ]
})
export class AppComponent {}
