/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'projects/angular-toolbox/src/public-api';
import { AngularToolboxCodeViewportComponent } from '../code-viewport/code-viewport.component';

@Component({
    selector: 'atx-git-section',
    imports: [
        NavigateToUrlDirective,
        AngularToolboxCodeViewportComponent
    ],
    templateUrl: './git-section.component.html',
    styleUrl: './git-section.component.scss'
})
export class  AngularToolboxGitSectionComponent {
  
  protected readonly gitRef: string = "https://github.com/pechemann/angular-toolbox";
}
