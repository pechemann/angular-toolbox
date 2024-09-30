/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { HttpParameterDescriptor } from '../../../../../model';
import { SafeHtmlPipe } from '../../../../../pipe';

@Component({
  selector: 'atx-mock-param',
  standalone: true,
  imports: [
    SafeHtmlPipe
  ],
  templateUrl: './atx-mock-param.component.html',
  styleUrl: './atx-mock-param.component.scss'
})
export class AtxMockParamComponent {

  @Input()
  public param!: HttpParameterDescriptor;
}
