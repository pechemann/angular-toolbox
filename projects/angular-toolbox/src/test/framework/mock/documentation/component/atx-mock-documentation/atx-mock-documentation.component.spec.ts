/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDocumentation } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-documentation/atx-mock-documentation.component';
import { HttpMockConfig, HttpMockInterceptor, Uuid } from 'projects/angular-toolbox/src/public-api';

const buildMockSkeleton = ():HttpMockConfig => {
  const cfg: HttpMockConfig = {
    interceptors: []
  };
  return cfg;
};

const buildInterceptorSkeleton = ():HttpMockInterceptor => {
  const cfg: HttpMockInterceptor = {
    id: Uuid.build().toString(),
    endpoints: []
  };
  return cfg;
};

describe('AtxMockDocumentation', () => {
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

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('should not render anything by default', () => {
    expect(fixture.nativeElement.querySelectorAll('section').length).toEqual(0);
  });
  
  it('should create HTML structure when the config property is set', () => {
    const elm = fixture.nativeElement;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    expect(elm.querySelectorAll('section').length).toEqual(2);
    const h2: HTMLHeadingElement[] = elm.querySelectorAll('h2');
    expect(h2.length).toEqual(2);
    expect(h2[0].textContent).toEqual("Description");
    expect(h2[1].textContent).toEqual("Interceptors");
    const btn: HTMLButtonElement = elm.querySelector('button');
    expect(btn).toBeTruthy();
  });
  
  it('title should be "HTTP Mock API" by default', () => {
    expect(component.title).toEqual("HTTP Mock API");
  });
  
  it('button element text should be "Expand all" by default', () => {
    const elm = fixture.nativeElement;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    const btn: HTMLButtonElement = elm.querySelector('button');
    expect(btn.textContent).toEqual("Expand all");
  });
  
  it('clicking the button element should set the text to "Collapse all" and "Expand all" alternatively', () => {
    const elm = fixture.nativeElement;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    const btn: HTMLButtonElement = elm.querySelector('button');
    expect(btn.textContent).toEqual("Expand all");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    expect(btn.textContent).toEqual("Collapse all");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    expect(btn.textContent).toEqual("Expand all");
  });
});

describe('AtxMockDocumentation: root level', () => {
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
  
  it('H1 element should contain "HTTP Mock API" by default', () => {
    const elm = fixture.nativeElement;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    const h1: HTMLHeadingElement = elm.querySelector('h1');
    expect(h1.textContent).toEqual(component.title);
  });
  
  it('setting title should update the H1 element', () => {
    const NEW_TITLE: string = "New Title";
    component.title = NEW_TITLE;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    const h1: HTMLHeadingElement = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual(NEW_TITLE);
  });
  
  it('should not display the full description if origin and description are undefined', () => {
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    const div: HTMLElement = fixture.nativeElement.querySelector('atx-mock-full-description');
    expect(div).toBeNull();
  });

  it('should display the full description if description is defined', () => {
    const cfg: HttpMockConfig = buildMockSkeleton();
    cfg.description = "Lorem ipsum";
    component.config = cfg;
    fixture.detectChanges();
    const description: HTMLElement = fixture.nativeElement.querySelector('atx-mock-full-description');
    expect(description).toBeTruthy();
  });

  it('should display the full description if origin is defined', () => {
    const cfg: HttpMockConfig = buildMockSkeleton();
    cfg.origin = "Lorem ipsum";
    component.config = cfg;
    fixture.detectChanges();
    const description: HTMLElement = fixture.nativeElement.querySelector('atx-mock-full-description');
    expect(description).toBeTruthy();
  });
});

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
});

