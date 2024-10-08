/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDocumentation } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-documentation/atx-mock-documentation.component';
import { HttpMockConfig } from 'projects/angular-toolbox/src/public-api';
import { By } from '@angular/platform-browser';
import { buildInterceptorSkeleton, buildMockSkeleton } from './atx-mock-documentation.component.test.util';

describe('AtxMockDocumentation: Interceptors', () => {
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
  
  it('interceptors should create summary elements that contain the interceptor ID', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptors = [
      buildInterceptorSkeleton(),
      buildInterceptorSkeleton()
    ];
    cfg.interceptors = interceptors;
    component.config = cfg;
    fixture.detectChanges();
    const summary = elm.querySelectorAll('summary');
    expect(summary.length).toEqual(2);
    expect(summary[0].textContent).toContain(interceptors[0].id);
    expect(summary[1].textContent).toContain(interceptors[1].id);
  });
  
  it('clickin the button should toggle the open state of the details elements', () => {
    const elm = fixture.nativeElement;
    const cfg: HttpMockConfig = buildMockSkeleton();
    const interceptors = [
      buildInterceptorSkeleton(),
      buildInterceptorSkeleton()
    ];
    cfg.interceptors = interceptors;
    component.config = cfg;
    fixture.detectChanges();
    const details = elm.querySelectorAll('details');
    const btn: HTMLButtonElement = elm.querySelector('button');
    expect(details.length).toEqual(2);
    details.forEach((elm: any) => expect(elm.open).toBeFalse());
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    details.forEach((elm: any) => expect(elm.open).toBeTrue());
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    details.forEach((elm: any) => expect(elm.open).toBeFalse());
  });
  
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
  });
});
