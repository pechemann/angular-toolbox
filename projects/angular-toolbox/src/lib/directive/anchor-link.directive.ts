/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { LINK_ROLE } from '../util';
import { DEFAULT_SCROLL_BEHAVIOR } from '../util/default-scroll-behavior';
import { Router } from '@angular/router';

// NOT TESTED YET
@Directive({
  selector: '[anchorLink]',
  standalone: true,
  providers: [
    Router
  ]
})
export class AnchorLinklDirective {

  @Input()
  public href!: string;
  
  /**
   * @private
   */
  @HostListener('click')
  private onClick(event: MouseEvent): void {
    event.preventDefault();
    const HREF: string | undefined = this.href;
    if (!HREF) throw new ReferenceError("href attribute is not defined.");
    this._document.defaultView.location.href = HREF;
    this._router.navigate([], { fragment: HREF.slice(1)});
    (this._document.querySelector(HREF) as HTMLElement).scrollIntoView(DEFAULT_SCROLL_BEHAVIOR);
  }

  /**
   * @private
   */
  constructor(@Inject(DOCUMENT) private _document: any,
              private _elmRef: ElementRef,
              private _router: Router) {
    const elm: HTMLElement = this._elmRef.nativeElement;
    elm.role = LINK_ROLE;
    elm.tabIndex = 0;
  }
}
