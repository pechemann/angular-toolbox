/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HighlightService } from '../../model/service/highlight.service';

@Component({
  selector: 'atx-code-viewport',
  standalone: true,
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class AngularToolboxCodeViewportComponent implements AfterViewInit {

  protected language: string = "language-typescript";

  @ViewChild("code")
  private _code!: ElementRef;
  private _srcCode!: string;

  @Input()
  public set lang(value: string) {
    this.language = `language-${value}`;
    this._highlightService.highlightAll();
  }

  constructor(private _highlightService: HighlightService) {}

  ngAfterViewInit(): void {
    this._srcCode = this._code.nativeElement.innerHTML;
  }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this._srcCode);
  }
}
