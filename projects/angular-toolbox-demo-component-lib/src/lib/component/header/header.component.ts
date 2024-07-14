/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { AngularToolboxLogoComponent } from 'projects/angular-toolbox/src/public-api';

@Component({
  selector: 'atx-header',
  standalone: true,
  imports: [
    AngularToolboxLogoComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class AngularToolboxHeaderComponent {

  @Input()
  public title!: string;
}
