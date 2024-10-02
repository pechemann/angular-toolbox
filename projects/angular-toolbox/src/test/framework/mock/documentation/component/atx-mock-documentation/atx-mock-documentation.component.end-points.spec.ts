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

  /*
  
  it('full description should not be available by default', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptors = [
      buildInterceptorSkeleton(),
      buildInterceptorSkeleton()
    ];
    cfg.interceptors = interceptors;
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.querySelectorAll("atx-mock-full-description");
    expect(fullDesc.length).toEqual(0);
  });
  
  it('full description should be available if description is set', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptor = buildInterceptorSkeleton()
    interceptor.description = "Lorem ipsum";
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.querySelector("atx-mock-full-description");
    expect(fullDesc).toBeTruthy();
  });
  
  it('full description config should be set if description is set', () => {
    const elm = fixture.debugElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptor = buildInterceptorSkeleton()
    interceptor.description = "Lorem ipsum";
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.query(By.css("atx-mock-full-description"));
    expect(fullDesc.componentInstance.config).toBe(interceptor);
  });

  it('full description should be available if origin is set', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptor = buildInterceptorSkeleton()
    interceptor.origin = "Lorem ipsum";
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.querySelector("atx-mock-full-description");
    expect(fullDesc).toBeTruthy();
  });
  
  it('full description config should be set if origin is set', () => {
    const elm = fixture.debugElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptor = buildInterceptorSkeleton()
    interceptor.origin = "Lorem ipsum";
    cfg.interceptors = [ interceptor ];
    component.config = cfg;
    fixture.detectChanges();
    const fullDesc = elm.query(By.css("atx-mock-full-description"));
    expect(fullDesc.componentInstance.config).toBe(interceptor);
  });*/
});

