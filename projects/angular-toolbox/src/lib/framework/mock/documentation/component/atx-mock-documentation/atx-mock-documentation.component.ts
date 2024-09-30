/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { HttpMethodMock, HttpMockConfig, HttpMockEMethodDescriptor, HttpMockEndpoint, HttpMockEndpointParameterDescriptor } from '../../../../../model';
import { SafeHtmlPipe } from '../../../../../pipe';
import { EMPTY_STRING } from 'projects/angular-toolbox/src/public-api';

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
    SafeHtmlPipe
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

  protected getParamList(endpoint: HttpMockEndpoint): HttpMockEndpointParameterDescriptor[] {
    const result: HttpMockEndpointParameterDescriptor[] = [];
    const params: HttpMockEndpointParameterDescriptor[] | undefined = endpoint.descriptor?.params;
    if (params === undefined) return result;
    return params;
  }

  protected toggleExpandState(): void {
    const details = (document.querySelector(HTML_REF) as any).shadowRoot.querySelectorAll(DETAILS);
    this.expanded = !this.expanded;
    if (this.expanded) return details.forEach((elm: HTMLDetailsElement) => elm.setAttribute(OPEN, EMPTY_STRING));
    details.forEach((elm: HTMLDetailsElement) => elm.removeAttribute(OPEN));
  }
}
