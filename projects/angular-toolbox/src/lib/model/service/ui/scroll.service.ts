/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { ScrollBehavior } from '../../business';

@Injectable({
  providedIn: 'root'
})
/**
 * A lightweight service that provides scrolling capabilities to your Angular application.
 */
export class ScrollService {

    /**
     * The callback function that is triggered when a scroll operation is performed.
     * 
     * @typeParam `EventEmitter<Event>` The reference to the original scroll event.
     */
  public readonly onScroll: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * @private
     * Creates a new `ScrollService` instance.
     * 
     * @param _document The reference to the `Document` singleton.
     */
  constructor(@Inject(DOCUMENT) private _document: Document) {
    window.addEventListener("scroll", (e: Event) => {
      this.onScroll.next(e);
    });
  }

  /**
   * Scrolls the ancestor containers of the element with the specified selector such that 
   * this element  is visible to the user.
   * 
   * @param selector The selector of the target element.
   * @param arg A `boolean` value:
   * If `true`, the top of the element will be aligned to the top of the visible area of the
   * scrollable ancestor.
   * If `false`, the bottom of the element will be aligned to the bottom of the visible area
   * of the scrollable ancestor. 
   * @param arg A dictionary containing the scroll parameters.
   */
  public scrollIntoView(selector: string, arg?: boolean | ScrollIntoViewOptions | undefined): void {
    const elm: Element | null = this._document.querySelector(selector);
    if (elm) elm.scrollIntoView(arg);
  }

  /**
   * Scrolls the app viewport to the top of the browser window.
   * 
   * @param behavior Specifies whether the scrolling should animate smoothly (`smooth`),
   *                 happen instantly in a single jump (`instant`), or let the browser
   *                 choose (`auto`, `default`).
   */
  public gotoTop(behavior: ScrollBehavior = 'smooth'): void {
    const options: ScrollToOptions = {
      top: 0,
      behavior: behavior as any
    };
    this.scroll(options);
  }

  /**
   * Scrolls the app viewport according to the specified options, into the browser window.
   * 
   * @param options A dictionary containing the scroll parameters.
   */
  public scroll(options?: ScrollToOptions): void {
    window.scroll(options);
  }
  
  /**
   * Scrolls the app viewport by the specified `x/y` coordinates, into the browser window.
   * 
   * @param x The horizontal pixel value that you want to scroll by.
   * @param y The vertical  pixel value that you want to scroll by.
   */
  public scrollBy(x: number, y: number): void {
    window.scrollBy(x, y);
  }
}
