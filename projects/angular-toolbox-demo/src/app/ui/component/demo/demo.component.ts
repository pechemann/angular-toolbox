import { Component, Input, TemplateRef } from '@angular/core';
import { CodeWrapper } from '../../model/business/code-wrapper';
import { SrcViewportComponent } from '../src-viewport/src-viewport.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo',
  standalone: true,
  imports: [
    CommonModule,
    SrcViewportComponent
  ],
  templateUrl: './demo.component.html'
})
export class DemoComponent {

  @Input()
  public title: string | null = null;

  @Input()
  public presentation: string | null = null;

  @Input()
  public srcCode: CodeWrapper | null = null;

  public contentTemplateRef: TemplateRef<any> | null = null;
}
