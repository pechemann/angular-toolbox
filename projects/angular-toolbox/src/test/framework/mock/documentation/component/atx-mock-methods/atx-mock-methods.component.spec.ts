/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockMethodsComponent } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-methods/atx-mock-methods.component';
import { HttpMockEndpoint, httpResponseMock } from 'projects/angular-toolbox/src/public-api';
import { buildEndpointSkeleton } from '../atx-mock-documentation/atx-mock-documentation.component.test.util';
import { By } from '@angular/platform-browser';

describe('AtxMockMethodsComponent', () => {
  let component: AtxMockMethodsComponent;
  let fixture: ComponentFixture<AtxMockMethodsComponent>;

  const buildMock = ()=> {
    const endpoint: HttpMockEndpoint = buildEndpointSkeleton("route/test/");
    endpoint.get = {
      data: ()=> httpResponseMock().response()
    };
    endpoint.delete = {
      data: ()=> httpResponseMock().response()
    };
    return endpoint;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtxMockMethodsComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockMethodsComponent);
    component = fixture.componentInstance;
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('endpoint should be undefined by default', () => {
    expect(component.endpoint).toBeUndefined();
  });

  it('should be empty if no method is defined', () => {
    const elm = fixture.nativeElement;
    expect(elm.querySelector("h3")).toBeNull();
    expect(elm.querySelector("ul")).toBeNull();
  });
  
  it('should create HTML structure when methods are defined', () => {
    const elm = fixture.nativeElement;
    component.endpoint = buildMock();
    fixture.detectChanges();
    expect(elm.querySelector("h3").textContent).toEqual("Methods");
    expect(elm.querySelector("ul")).toBeTruthy();
    expect(elm.querySelectorAll("li").length).toEqual(2);
  });
  
  it('should display method names', () => {
    const elm = fixture.nativeElement;
    component.endpoint = buildMock();
    fixture.detectChanges();
    const spanList = elm.querySelectorAll("span");
    expect(spanList[0].textContent).toEqual("get");
    expect(spanList[1].textContent).toEqual("delete");
  });
  
  it('should add separations between methods', () => {
    const elm = fixture.nativeElement;
    component.endpoint = buildMock();
    fixture.detectChanges();
    const ul = elm.querySelector("ul");
    expect(ul.querySelectorAll('hr').length).toEqual(1);
    //expect(ul.lastChild.nodeName).toEqual("li");
  });
  
  it('descriptor element should not be available by default', () => {
    const elm = fixture.nativeElement;
    component.endpoint = buildMock();
    expect(elm.querySelector('.method-descriptor')).toBeNull();
  });

  it('should add descriptor element whether descriptor if defined', () => {
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {};
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelectorAll('.method-descriptor').length).toEqual(1);
  });

  it('description should nnot be available by default', () => {
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {};
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('atx-mock-description')).toBeDefined();
  });

  it('description should be displayed if descriptor.description is defined', () => {
    const description: string = "Lorem ipsum";
    const elm = fixture.debugElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {
      description: description
    };
    component.endpoint = mock;
    fixture.detectChanges();
    const desc = elm.query(By.css("atx-mock-description"));
    expect(desc.componentInstance.description).toEqual(description);
  });
  
  it('payload and body should nnot be available by default', () => {
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {};
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelectorAll('dl').length).toEqual(0);
  });

  it('payload should be displayed if descriptor.payload is defined', () => {
    const description: string = "Lorem ipsum";
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {
      payload: description
    };
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('dt').textContent).toEqual("payload:");
    expect(elm.querySelector('dd').textContent).toEqual(description);
  });

  it('body should be displayed if descriptor.body is defined', () => {
    const description: string = "Lorem ipsum";
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {
      body: description
    };
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('dt').textContent).toEqual("body:");
    expect(elm.querySelector('dd').textContent).toEqual(description);
  });
  
  it('payload should render HTML tags', () => {
    const description: string = "<em>Lorem ipsum</em>";
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {
      payload: description
    };
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('em').textContent).toEqual("Lorem ipsum");
  });

  it('body should render HTML tags', () => {
    const description: string = "<em>Lorem ipsum</em>";
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {
      body: description
    };
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('em').textContent).toEqual("Lorem ipsum");
  });
  
  it('query params should not be available by default', () => {
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    mock["get"].descriptor = {};
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelectorAll('h4').length).toEqual(0);
    expect(elm.querySelectorAll('atx-mock-param').length).toEqual(0);
  });
  
  it('query params should be displayed if descriptor.queryParams is defined', () => {
    const elm = fixture.nativeElement;
    const mock: any = buildMock();
    const params = [
      { ref: "test", description: "test description"}
    ];
    mock["get"].descriptor = {
      queryParams: params
    };
    component.endpoint = mock;
    fixture.detectChanges();
    expect(elm.querySelector('h4').textContent).toEqual("Query Parameters");
    const atxMockParam = fixture.debugElement.query(By.css("atx-mock-param"));
    expect(atxMockParam.componentInstance.params).toEqual(params);
  });
});
