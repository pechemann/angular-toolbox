/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component } from '@angular/core';
import { NavigateToUrlDirective } from 'angular-toolbox';
import { CodeViewportComponent } from '../code-viewport/code-viewport.component';

@Component({
  selector: 'git-section',
  standalone: true,
  imports: [
    NavigateToUrlDirective,
    CodeViewportComponent
  ],
  templateUrl: './git-section.component.html',
  styleUrl: './git-section.component.scss'
})
export class GitSectionComponent {
  
  protected readonly gitRef: string = "https://github.com/pechemann/angular-toolbox";
}
