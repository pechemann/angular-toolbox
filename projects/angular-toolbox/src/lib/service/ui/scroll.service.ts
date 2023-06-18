import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  public readonly onScroll: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(@Inject(DOCUMENT) private _document: Document) {
    window.onscroll = (e: Event) => {
      this.onScroll.next(e);
    };
  }

  public scrollIntoView(selector: string, arg?: boolean | ScrollIntoViewOptions | undefined): void {
    const elm: Element | null = this._document.querySelector(selector);
    if (elm) elm.scrollIntoView(arg);
  }

  public gotoTop(behavior: ScrollBehavior = 'smooth'): void {
    this.scrollTo(0, 0, behavior);
  }

  public scrollTo(top: number, left: number = 0, behavior: ScrollBehavior = 'smooth'): void {
    window.scroll({
      top: top,
      left: left,
      behavior: behavior
    });
  }
}
