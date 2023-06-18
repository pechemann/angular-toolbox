import { Component, Input, TemplateRef } from '@angular/core';
import { CodeWrapper } from '../model/business/code-wrapper';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
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
