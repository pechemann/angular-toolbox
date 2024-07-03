/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from 'angular-toolbox';
import { AngularToolboxHrComponent } from '../hr/hr.component';

@Component({
  selector: 'atx-page-title',
  standalone: true,
  templateUrl: './page-title.component.html',
  imports: [
    SafeHtmlPipe,
    AngularToolboxHrComponent
  ]
})
export class AngularToolboxPageTitleComponent {

  @Input()
  public label!: string;
}