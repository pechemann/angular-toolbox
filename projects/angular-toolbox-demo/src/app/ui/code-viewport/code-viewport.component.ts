import { Component, Input } from '@angular/core';
import { CodeWrapper } from '../model/business/code-wrapper';

declare type Language = "html" | "ts" | "css";

@Component({
  selector: 'code-viewport',
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class CodeViewportComponent {

  private _codeWrapper: CodeWrapper | null = null;

  @Input() public set srcCode(value: CodeWrapper | null) {
    this._codeWrapper = value;
    if (value) this.changeSrcDisplay('html');
  };

  public currentSrc: string | null = null;
  public currLang: Language = 'html';

  public changeSrcDisplay(type: Language): void {
    this.currLang = type;
    if (this._codeWrapper) this.currentSrc = this.getRawCode();
  }

  public getRawCode(): string {
    return this._getRawCode(this.currLang);
  }

  public hasSrcCode(type: Language): boolean {
    return (this._getRawCode(type) != null);
  }
  
  private _getRawCode(type: Language): string {
    return ((obj: any)=> obj[type])(this._codeWrapper);
  }
}
