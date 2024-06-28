/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { Component, Input, TemplateRef } from '@angular/core';
import { CodeWrapper } from '../../model/business/code-wrapper';
import { SrcViewportComponent } from '../src-viewport/src-viewport.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentationLink } from '../../model/business/ducumentation-link';

@Component({
  selector: 'demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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

  @Input()
  public documentation: DocumentationLink | null = null;

  public contentTemplateRef: TemplateRef<any> | null = null;
}
