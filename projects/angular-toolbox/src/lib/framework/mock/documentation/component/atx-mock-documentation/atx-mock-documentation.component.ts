/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { HttpMethodMock, HttpMockConfig, HttpMockEndpoint } from '../../../../../model';
import { SafeHtmlPipe } from '../../../../../pipe';
import { EMPTY_STRING } from '../../../../../util';
import { AtxMockParamComponent } from '../atx-mock-param/atx-mock-param.component';
import { MethodDocDescriptor } from '../../model/business/method-doc-descriptor.type';

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
 * An easy-to-use component that displays the documentation of a `HttpMockConfig` object.
 */
@Component({
  selector: 'atx-mock-documentation',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    AtxMockParamComponent
  ],
  templateUrl: './atx-mock-documentation.component.html',
  styleUrl: './atx-mock-documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtxMockDocumentation {

  /**
   * @private
   */
  protected configApi!: HttpMockConfig;

  /**
   * @private
   */
  protected expanded: boolean = false;

  /**
   * Specifies the title of the current display.
   */
  @Input()
  public title: string = "HTTP Mock API";

  /**
   * Gets or sets the `HttpMockConfig` object for which to display documentation.
   */
  @Input()
  public set config(value: HttpMockConfig) {
    this.configApi = value;
    this.expanded = false;
  }
  public get config(): HttpMockConfig {
    return this.configApi;
  }

  constructor(private elmRef: ElementRef) {}

  /**
   * @private
   */
  protected getMethodList(endpoint: HttpMockEndpoint): MethodDocDescriptor[] {
    const keys: string[] = Object.keys(endpoint);
    const methods: MethodDocDescriptor[] = [];
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

  /**
   * @private
   */
  protected toggleExpandState(): void {
    const details: HTMLDetailsElement[] = this.elmRef.nativeElement.querySelectorAll(DETAILS);
    this.expanded = !this.expanded;
    if (this.expanded) return details.forEach((elm: HTMLDetailsElement) => elm.setAttribute(OPEN, EMPTY_STRING));
    details.forEach((elm: HTMLDetailsElement) => elm.removeAttribute(OPEN));
  }
}
