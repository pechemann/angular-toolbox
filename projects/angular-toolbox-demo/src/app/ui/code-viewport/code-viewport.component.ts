import { Component, Input } from '@angular/core';
import { CodeWrapper } from '../model/code-wrapper';

@Component({
  selector: 'code-viewport',
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class CodeViewportComponent {

  private _codeWrapper: CodeWrapper | null = null;

  @Input() public set srcCode(value: CodeWrapper) {
    this._codeWrapper = value;
    if (value) this.changeSrcDisplay('html');
  };

  public currentSrc: string | null = null;

  public changeSrcDisplay(type: string): void {
    if (this._codeWrapper) {
      const code: string = ((obj: any)=> obj[type])(this._codeWrapper);
      this.currentSrc = code;
    }
  }
}
