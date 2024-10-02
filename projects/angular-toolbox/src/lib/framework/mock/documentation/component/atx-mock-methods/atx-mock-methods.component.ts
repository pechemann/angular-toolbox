/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, Input } from '@angular/core';
import { AtxMockParamComponent } from '../atx-mock-param/atx-mock-param.component';
import { AtxMockDescriptionComponent } from '../atx-mock-description/atx-mock-description.component';
import { HttpMethodMock, HttpMockEndpoint } from '../../../../../model';
import { MethodDocDescriptor } from '../../model/business/method-doc-descriptor.type';

/**
 * @private
 */
const ROUTE: string = "route";

/**
 * @private
 */
const DESCRIPTOR: string = "descriptor";

/**
 * @private
 * A convenient component that allows to display documentation for HTTP methods of an endpoint.
 */
@Component({
  selector: 'atx-mock-methods',
  standalone: true,
  imports: [
    AtxMockParamComponent,
    AtxMockDescriptionComponent
  ],
  templateUrl: './atx-mock-methods.component.html'
})
export class AtxMockMethodsComponent {
  
  /**
   * @private
   */
  protected methods: MethodDocDescriptor[] = [];

  /**
   * @private
   */
  private _endpoint!: HttpMockEndpoint;

  /**
   * @private
   * The endpoint for which to show HTTP methods documentation.
   */
  @Input()
  public set endpoint(value: HttpMockEndpoint) {
    this._endpoint = value;
    this.methods = this.initMethodList(value);
  }
  public get endpoint(): HttpMockEndpoint {
    return this._endpoint;
  }
  
  /**
   * @private
   */
  protected initMethodList(endpoint: HttpMockEndpoint): MethodDocDescriptor[] {
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
}
