/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from 'angular-toolbox';

@Component({
  selector: 'at-page-title',
  standalone: true,
  templateUrl: './page-title.component.html',
  imports: [
    SafeHtmlPipe
  ]
})
export class AngularToolboxPageTitleComponent {

  @Input()
  public label!: string;

  @Input()
  public showQrCode: boolean = false;
}
