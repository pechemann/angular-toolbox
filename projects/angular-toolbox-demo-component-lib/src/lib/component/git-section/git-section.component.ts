/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';
import { AngularToolboxCodeViewportComponent } from '../code-viewport/code-viewport.component';

@Component({
  selector: 'atx-git-section',
  standalone: true,
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
