/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

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
