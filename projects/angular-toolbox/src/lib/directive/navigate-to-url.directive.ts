import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { BUTTON_ROLE } from '../util';


@Directive({
  selector: '[navigateToUrl]',
  standalone: true
})
export class NavigateToUrlDirective {

  @Input()
  public href!: string;
  
  /**
   * @private
   */
  @HostListener('click')
  private onClick(): void {
    const HREF: string | undefined = this.href;
    if (HREF) this._document.defaultView.location.href = HREF;
    throw new ReferenceError("href attribute is not defined.");
  }

  /**
   * @private
   */
  constructor(@Inject(DOCUMENT) private _document: any,
              private _elmRef: ElementRef) {
    const elm: HTMLElement = this._elmRef.nativeElement;
    elm.role = BUTTON_ROLE;
    elm.tabIndex = 0;
  }
}
