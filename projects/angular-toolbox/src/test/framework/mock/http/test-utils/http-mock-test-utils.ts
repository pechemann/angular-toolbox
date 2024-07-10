/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpMockConfig, HttpMockService, httpResponseMock, HttpMock, Uuid } from "projects/angular-toolbox/src/public-api";

export const UUID: Uuid = Uuid.build();

export const FOO_MOCK_CONFIG: HttpMockConfig = {
  id: UUID,
  origin: "https://my-awsome-company.com/api",
  interceptors: [
    {
      id: "foo",
      endpoints: [
        {
          route: "/foo",
          get: {
            data: () => httpResponseMock().response()
          }
        }
      ]
    }
  ]
};

@HttpMock(FOO_MOCK_CONFIG)
@Component({
  selector: 'app-foo',
  template: ''
})
export class FooComponent implements OnInit, OnDestroy {

  constructor(private mockService: HttpMockService) { }
  
  public ngOnInit(): void {}
  public ngOnDestroy(): void {}
}

@HttpMock(FOO_MOCK_CONFIG)
@Component({
  selector: 'app-todo',
  template: ''
})
export class InvalidComponentMockService implements OnInit, OnDestroy {
  public ngOnInit(): void {}
  public ngOnDestroy(): void {}
}

export const getInvalidComponentOnDestroy = ()=> {
  @HttpMock(FOO_MOCK_CONFIG)
  @Component({
    selector: 'app-todo',
    standalone: true,
    template: ''
  })
  class InvalidComponentOnDestroy implements OnInit {
  
    constructor(private mockService: HttpMockService) { }
    
    public ngOnInit(): void {}
  }

  return InvalidComponentOnDestroy;
}

export const getInvalidComponentOnInit = ()=> {

  @HttpMock(FOO_MOCK_CONFIG)
  @Component({
    selector: 'app-todo',
    standalone: true,
    template: ''
  })
  class InvalidComponentOnInit implements OnDestroy {

    constructor(private mockService: HttpMockService) { }
    
    public ngOnDestroy(): void {}
  }

  return InvalidComponentOnInit;
}