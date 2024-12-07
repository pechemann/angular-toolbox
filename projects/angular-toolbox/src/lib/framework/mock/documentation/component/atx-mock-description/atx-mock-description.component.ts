/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '../../../../../pipe';

/**
 * @private
 * A conmponent that renders mock config description ppoperties.
 */
@Component({
    selector: 'atx-mock-description',
    imports: [
        SafeHtmlPipe
    ],
    templateUrl: './atx-mock-description.component.html'
})
export class AtxMockDescriptionComponent {

  /**
   * @private
   * The description to render. Can contains HTML tags.
   */
  @Input()
  public description!: string;
}
