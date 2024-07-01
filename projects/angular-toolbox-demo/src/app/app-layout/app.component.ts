/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularToolboxBreadcrumbComponent, AngularToolboxDarkModeComponent, AngularToolboxFooterComponent, AngularToolboxHeaderComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    AngularToolboxHeaderComponent,
    AngularToolboxFooterComponent,
    AngularToolboxDarkModeComponent,
    AngularToolboxBreadcrumbComponent
  ]
})
export class AppComponent {}
