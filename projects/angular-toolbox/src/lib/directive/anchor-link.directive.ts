/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { LINK_ROLE } from '../util';
import { DEFAULT_SCROLL_BEHAVIOR } from '../util/default-scroll-behavior';
import { Router } from '@angular/router';
import { NavigationDirectiveBase } from './navigation-directive-base';

/**
 * Provides functionality to activate anchor navigation through the native Angular router.
 */
@Directive({
  selector: '[anchorLink]',
  standalone: true,
})
export class AnchorLinklDirective extends NavigationDirectiveBase implements AfterViewInit {

  /**
   * The `href` attribute of the decorated element.
   */
  @Input()
  public href!: string;
  
  /**
   * @private
   */
  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent): void {
    event.preventDefault();
    const HREF: string | undefined = this.href;
    this._router.navigate([], { fragment: HREF.slice(1)});
    (this._document.querySelector(HREF) as HTMLElement).scrollIntoView(DEFAULT_SCROLL_BEHAVIOR);
  }

  /**
   * @private
   */
  constructor(@Inject(DOCUMENT) private _document: any,
              elmRef: ElementRef,
              private _router: Router) {
    super(elmRef, LINK_ROLE);
  }
  
  /**
   * @private
   */
  public ngAfterViewInit(): void {
    const HREF: string | undefined = this.href;
    if (!HREF) throw new ReferenceError("href attribute is not defined.");
  }
}
