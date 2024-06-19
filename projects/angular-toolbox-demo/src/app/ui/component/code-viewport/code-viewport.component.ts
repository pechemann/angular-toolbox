import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-viewport',
  templateUrl: './code-viewport.component.html',
  styleUrls: ['./code-viewport.component.scss']
})
export class CodeViewportComponent {

  @Input()
  public code!: string;
}
