import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-viewport',
  standalone: true,
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class CodeViewportComponent {

  @Input()
  public code!: string;

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.code);
  }
}
