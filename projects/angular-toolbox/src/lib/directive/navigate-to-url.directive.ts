/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { LINK_ROLE } from '../util';
import { NavigationDirectiveBase } from './navigation-directive-base';

/**
 * An easy-to-use directive that enables keyboard navigation and provides support for navigating to an external URL.
 */
@Directive({
  selector: '[navigateToUrl]',
  standalone: true
})
export class NavigateToUrlDirective extends NavigationDirectiveBase {

  /**
   * The `href` attribute of the decorated element.
   */
  @Input()
  public href!: string;
  
  /**
   * @private
   */
  @HostListener('click')
  private onClick(): void {
    const HREF: string | undefined = this.href;
    if (!HREF) throw new ReferenceError("href attribute is not defined.");
    this._document.defaultView.location.href = HREF;
  }

  /**
   * @private
   */
  constructor(@Inject(DOCUMENT) private _document: any,
              elmRef: ElementRef) {
    super(elmRef, LINK_ROLE);
  }
}
