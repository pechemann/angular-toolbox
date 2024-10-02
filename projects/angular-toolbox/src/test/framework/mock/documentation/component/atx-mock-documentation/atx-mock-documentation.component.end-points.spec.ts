/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDocumentation } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-documentation/atx-mock-documentation.component';
import { HttpMockConfig, HttpMockEndpoint } from 'projects/angular-toolbox/src/public-api';
import { buildEndpointSkeleton, buildInterceptorSkeleton, buildMockSkeleton } from './atx-mock-documentation.component.test.util';
import { By } from '@angular/platform-browser';

describe('AtxMockDocumentation: Endpoints', () => {
  let component: AtxMockDocumentation;
  let fixture: ComponentFixture<AtxMockDocumentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockDocumentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockDocumentation);
    component = fixture.componentInstance;
  });
  
  it('endpoints should not be available by default', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptors = [
      buildInterceptorSkeleton()
    ];
    cfg.interceptors = interceptors;
    component.config = cfg;
    fixture.detectChanges();
    const endpoints = elm.querySelector('.endpoint');
    expect(endpoints).toBeNull();
  });
  
  it('route should be displayed', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const endPoint: HttpMockEndpoint = buildEndpointSkeleton("route/test");
    const interceptor = buildInterceptorSkeleton();
    interceptor.endpoints = [endPoint];
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const endpoint = elm.querySelector('.endpoint');
    expect(endpoint.querySelector("dt").textContent).toEqual("route:");
    expect(endpoint.querySelector("dd").textContent).toEqual("route/test");
  });

  it('nothing should be displayed if descriptor id empty', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const endPoint: HttpMockEndpoint = buildEndpointSkeleton("route/test");
    const interceptor = buildInterceptorSkeleton();
    endPoint.descriptor = {};
    interceptor.endpoints = [endPoint];
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const endpoint = elm.querySelector('.endpoint');
    expect(endpoint.querySelector("atx-mock-description")).toBeNull();
    expect(endpoint.querySelector("h3")).toBeNull();
    expect(endpoint.querySelector("atx-mock-param")).toBeNull();
  });

  it('description should be available if descriptor.description is set', () => {
    const elm = fixture.debugElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const endPoint: HttpMockEndpoint = buildEndpointSkeleton("route/test");
    const interceptor = buildInterceptorSkeleton();
    endPoint.descriptor = {
      description: "Lorem ipsum"
    };
    interceptor.endpoints = [endPoint];
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.query(By.css("atx-mock-description"));
    expect(fullDesc.componentInstance.description).toBe(endPoint.descriptor.description);
  });
  
  it('parameters should be available if descriptor.params is set', () => {
    const elm = fixture.debugElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const endPoint: HttpMockEndpoint = buildEndpointSkeleton("route/test");
    const interceptor = buildInterceptorSkeleton();
    endPoint.descriptor = {
      params: []
    };
    interceptor.endpoints = [endPoint];
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.query(By.css("atx-mock-param"));
    expect(fullDesc.componentInstance.params).toBe(endPoint.descriptor.params);
    const h3 = elm.nativeElement.querySelector("h3");
    expect(h3.textContent).toEqual("Parameters");
  });

  it('AtxMockMethodsComponent should be available by default', () => {
    const elm = fixture.debugElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const endPoint: HttpMockEndpoint = buildEndpointSkeleton("route/test");
    const interceptor = buildInterceptorSkeleton();
    interceptor.endpoints = [endPoint];
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.query(By.css("atx-mock-methods"));
    expect(fullDesc.componentInstance.endpoint).toBe(endPoint);
  });
});

