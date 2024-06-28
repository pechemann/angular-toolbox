/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, Input } from '@angular/core';
import { CodeWrapper } from '../../model/business/code-wrapper';
import { CodeViewportComponent } from '../code-viewport/code-viewport.component';

declare type Language = "html" | "typescript" | "css";

@Component({
  selector: 'src-viewport',
  standalone: true,
  imports: [
    CodeViewportComponent
  ],
  templateUrl: './src-viewport.component.html',
  styleUrls: ['./src-viewport.component.scss']
})
export class SrcViewportComponent {

  private _codeWrapper: CodeWrapper | null = null;

  @Input() public set srcCode(value: CodeWrapper | null) {
    this._codeWrapper = value;
    if (value) this.changeSrcDisplay('html');
  };

  public currentSrc: string[] | null = null;
  public currLang: Language = 'html';

  public changeSrcDisplay(type: Language): void {
    this.currLang = type;
    if (this._codeWrapper) this.currentSrc = this._getRawCode(this.currLang);
  }

  public hasSrcCode(type: Language): boolean {
    return (this._getRawCode(type) != null);
  }
  
  private _getRawCode(type: Language): string[] {
    return ((obj: any)=> obj[type])(this._codeWrapper);
  }
}
