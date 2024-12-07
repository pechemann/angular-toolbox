/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularToolboxBreadcrumbComponent, AngularToolboxDarkModeComponent, AngularToolboxFooterComponent,  AngularToolboxHeaderComponent } from 'projects/angular-toolbox-demo-component-lib/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        AngularToolboxHeaderComponent,
        AngularToolboxFooterComponent,
        AngularToolboxDarkModeComponent,
        AngularToolboxBreadcrumbComponent
    ]
})
export class AppComponent {}
