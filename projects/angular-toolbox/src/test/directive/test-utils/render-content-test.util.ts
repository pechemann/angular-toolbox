/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from "@angular/core";
import { ContentRendererDirective } from "projects/angular-toolbox/src/public-api";

export const INJECTED_HTML_CONTENT: string = '<span>Hello World!</span>';

@Component({
  template: `<div id="testElm" contentRenderer [content]="content" (rendered)="onRendered($event)"></div>`,
  standalone: true,
  imports: [
    ContentRendererDirective
  ]
})
export class RenderContentDirectiveTestComponent {
  content: string = INJECTED_HTML_CONTENT;
  onRendered(elm: HTMLElement): void {}
}

