/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { ElementRef } from '@angular/core';

/**
 * @private
 * The base class for all directives that are responsible for navigation whithin ab Angular app.
 */
export class NavigationDirectiveBase {

  /**
   * @private
   */
  constructor(protected elmRef: ElementRef, role: string) {
    const elm: HTMLElement = elmRef.nativeElement;
    elm.role = role;
    elm.tabIndex = 0;
  }
}
