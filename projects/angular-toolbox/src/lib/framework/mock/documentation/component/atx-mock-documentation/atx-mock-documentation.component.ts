/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { HttpMethodMock, HttpMockConfig, HttpMockEMethodDescriptor, HttpMockEndpoint } from '../../../../../model';
import { SafeHtmlPipe } from '../../../../../pipe';
import { EMPTY_STRING } from '../../../../../util';
import { AtxMockParamComponent } from '../atx-mock-param/atx-mock-param.component';

/**
 * @private
 */
const ROUTE: string = "route";

/**
 * @private
 */
const OPEN: string = "open";

/**
 * @private
 */
const DETAILS: string = "details";

/**
 * @private
 */
const DESCRIPTOR: string = "descriptor";

/**
 * @private
 */
const HTML_REF: string = "atx-mock-documentation";

type MethodDescriptor = {
  method: string,
  descriptor: HttpMockEMethodDescriptor | undefined
};

@Component({
  selector: 'atx-mock-documentation',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    AtxMockParamComponent
  ],
  templateUrl: './atx-mock-documentation.component.html',
  styleUrl: './atx-mock-documentation.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxMockDocumentation {

  protected configApi!: HttpMockConfig;

  protected expanded: boolean = false;

  @Input()
  public title: string = "HTTP Mock API";

  @Input()
  public set config(value: HttpMockConfig) {
    this.configApi = value;
    this.expanded = false;
  }
  public get config(): HttpMockConfig {
    return this.configApi;
  }

  protected getMethodList(endpoint: HttpMockEndpoint): MethodDescriptor[] {
    const keys: string[] = Object.keys(endpoint);
    const methods: MethodDescriptor[] = [];
    keys.forEach(key =>{
      if (key !== ROUTE && key !== DESCRIPTOR) {
        const mock: HttpMethodMock = (endpoint as any)[key];
        methods.push({
          method: key,
          descriptor: mock.descriptor
        });
      }
    });
    return methods;
  }

  protected toggleExpandState(): void {
    const details = (document.querySelector(HTML_REF) as any).shadowRoot.querySelectorAll(DETAILS);
    this.expanded = !this.expanded;
    if (this.expanded) return details.forEach((elm: HTMLDetailsElement) => elm.setAttribute(OPEN, EMPTY_STRING));
    details.forEach((elm: HTMLDetailsElement) => elm.removeAttribute(OPEN));
  }
}
