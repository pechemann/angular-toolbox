import { Injectable } from '@angular/core';

declare const hljs: any;

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  public highlightAll(): void {
    setTimeout(()=> hljs.highlightAll(), 0);
  }
}
