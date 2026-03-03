/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BUTTON_ROLE } from '../util';
import { NavigationDirectiveBase } from './navigation-directive-base';
import { ButtonRoleDataObject } from '../model';

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
  standalone: true,
  host: {
    '(keyup)': 'onKeyup($event)',
    '(click)': 'onClick($event)'
  }
})
export class ButtonRoleDirective<T> extends NavigationDirectiveBase implements AfterViewInit {

  /**
   * Dispatches events when the user presses the "Enter" key.
   */
  @Output()
  public readonly enter: EventEmitter<ButtonRoleDataObject<T>> = new EventEmitter<ButtonRoleDataObject<T>>();

  /**
   * Forces callback methods defined with the "enter" event listener to be invoked when user clicks on the 
   * decorated element.
   */
  @Input()
  public delegateClick: any;

  /**
   * Allows to associate any data to the directive. Data are passed as member of `ButtonRoleDataObject`
   * instances emmited by the `enter` event.
   */
  @Input()
  public atxData: T | null = null;

  /**
   * @private
   */
  protected onKeyup(event: KeyboardEvent): void {
    if (event.key !== ENTER_KEY) return;
    this.processEvent(event);
  }
  
  /**
   * @private
   */
  protected onClick(event: MouseEvent): void {
    if (this.delegateClick === undefined) return;
    this.processEvent(event);
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
  private processEvent(event: KeyboardEvent | MouseEvent | PointerEvent): void {
    const evt: Event = event as Event;
    evt.preventDefault();
    evt.stopImmediatePropagation();
    if (this._routerLinkRef) {
      this._router.navigate([this._routerLinkRef]);
      return;
    }
    this.elmRef.nativeElement.blur();
    this.enter.emit({
        event: event,
        data: this.atxData
    });
  }
}
