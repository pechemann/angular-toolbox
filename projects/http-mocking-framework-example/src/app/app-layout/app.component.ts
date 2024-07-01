/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularToolboxDarkModeComponent, AngularToolboxFooterComponent,  AngularToolboxHeaderComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    AngularToolboxHeaderComponent,
    AngularToolboxFooterComponent,
    AngularToolboxDarkModeComponent
  ]
})
export class AppComponent {}
