import { Component, Input } from '@angular/core';
import { HighlightService } from '../../model/service/highlight.service';

@Component({
  selector: 'code-viewport',
  standalone: true,
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class CodeViewportComponent {

  protected srcCode!: string;
  protected language: string = "language-typescript";

  @Input()
  public set lang(value: string) {
    this.language = `language-${value}`;
  }

  @Input()
  public set code(value: string) {
    this.srcCode = value;
    this._highlightService.highlightAll();
  }

  constructor(private _highlightService: HighlightService) {}

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.code);
  }
}
