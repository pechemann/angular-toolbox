/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { AtxMockDescriptionComponent } from '../atx-mock-description/atx-mock-description.component';
import { FullDescription } from '../../model/business/full-description.type';

/**
 * @private
 * A convenient component that displays the description and the origin of a mock config section.
 */
@Component({
  selector: 'atx-mock-full-description',
  standalone: true,
  imports: [
    AtxMockDescriptionComponent
  ],
  templateUrl: './atx-mock-full-description.component.html'
})
export class AtxMockFullDescriptionComponent {

  /**
   * @public
   * The config object taht contains the description to display.
   */
  @Input()
  public config!: FullDescription;
}
