/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/**
 * @private
 */
const ENTER_KEY: string = 'Enter';

/**
 * @private
 */
const BUTTON_ROLE: string = 'button';

/**
 * @private
 */
const ROUTER_LINK_REF: string = 'ng-reflect-router-link';

/**
 * An easy-to-use directive that enables keyboard navigation and provides support for keyboard "Enter" key events.
 */
@Directive({
  selector: '[buttonRole]',
  providers: [
    RouterModule
  ],
  standalone: true
})
export class ButtonRoleDirective<T> implements AfterViewInit {

  /**
   * Dispatches events when the user presses the "Enter" key.
   */
  @Output()
  public readonly enter: EventEmitter<T> = new EventEmitter<T>();

  /**
   * Forces callback methods defined with the "enter" event listener to be invoked when user clicks on the 
   * decorated element.
   */
  @Input()
  public delegateClick: any;

  /**
   * @private
   */
  @HostListener('keyup', ["$event", "$event.target.value"])
  private onKeyup(event: KeyboardEvent, value: T): void {
    if (event.key !== ENTER_KEY) return;
    this.processEvent(event, value);
  }
  
  /**
   * @private
   */
  @HostListener('click', ["$event", "$event.target.value"])
  private onClick(event: MouseEvent, value: T): void {
    if (this.delegateClick === undefined) return;
    this.processEvent(event, value);
  }

  /**
   * @private
   */
  private _routerLinkRef: string | null = null;

  /**
   * @private
   */
  constructor(private _elmRef: ElementRef,
              private _router: Router) {
    const elm: HTMLElement = this._elmRef.nativeElement;
    elm.role = BUTTON_ROLE;
    elm.tabIndex = 0;
  }

  /**
   * @private
   */
  public ngAfterViewInit(): void {
    const elm: HTMLElement = this._elmRef.nativeElement;
    this._routerLinkRef = elm.getAttribute(ROUTER_LINK_REF);
  }

  /**
   * @private
   */
  private processEvent(event: Event, value: T): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this._routerLinkRef) {
      this._router.navigate([this._routerLinkRef]);
      return;
    }
    this._elmRef.nativeElement.blur();
    this.enter.emit(value);
  }
}
