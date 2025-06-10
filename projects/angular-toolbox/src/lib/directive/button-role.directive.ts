/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BUTTON_ROLE } from '../util';
import { NavigationDirectiveBase } from './navigation-directive-base';

/**
 * @private
 */
const ENTER_KEY: string = 'Enter';

/**
 * @private
 */
const ROUTER_LINK_REF: string = 'routerLink';

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
export class ButtonRoleDirective<T> extends NavigationDirectiveBase implements AfterViewInit {

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
  constructor(elmRef: ElementRef,
              private _router: Router) {
    super(elmRef, BUTTON_ROLE);
  }

  /**
   * @private
   */
  public ngAfterViewInit(): void {
    const elm: HTMLElement = this.elmRef.nativeElement;
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
    this.elmRef.nativeElement.blur();
    this.enter.emit(value);
  }
}
