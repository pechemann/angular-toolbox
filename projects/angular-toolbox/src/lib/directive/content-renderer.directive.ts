/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

/**
 * @private
 */
const CHILD_LIST_TYPE: string = "childList";

/**
 * Allows injection of any value into an HTML element container (`div`, `button`, etc...).
 * A rendered event is emitted after the injected content has been rendered and is
 * available for DOM manipulation.
 */
@Directive({
  selector: '[contentRenderer]',
  standalone: true
})
export class ContentRendererDirective implements OnInit, OnDestroy {

  /**
   * @private
   */
  private readonly _observer: MutationObserver;

  /**
   * Dispatches events when the content of the HTML element has been rendered.
   */
  @Output()
  public readonly rendered: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  /**
   * @private
   */
  constructor(private _elmRef: ElementRef) {
    const nativeElement: HTMLElement = this._elmRef.nativeElement;
    this._observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.type === CHILD_LIST_TYPE) this.rendered.emit(nativeElement);
      });
    });
  }

  /**
   * @private
   */
  public ngOnDestroy(): void {
    this._observer.disconnect();
  }

  /**
   * @private
   */
  public ngOnInit(): void {
    this._observer.observe(
      this._elmRef.nativeElement,
      { attributes: false, childList: true, characterData: false }
    );
  }
}
