/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, Input } from '@angular/core';
import { HighlightService } from '../../model/service/highlight.service';

@Component({
  selector: 'at-code-viewport',
  standalone: true,
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class AngularToolboxCodeViewportComponent {

  protected language: string = "language-typescript";

  @Input()
  public set lang(value: string) {
    this.language = `language-${value}`;
    this._highlightService.highlightAll();
  }

  constructor(private _highlightService: HighlightService) {}

  public copyToClipboard(): void {
    //navigator.clipboard.writeText(this.code);
  }
}
