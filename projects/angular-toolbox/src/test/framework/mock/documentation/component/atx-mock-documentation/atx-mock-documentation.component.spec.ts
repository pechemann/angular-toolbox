/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockDocumentation } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-documentation/atx-mock-documentation.component';
import { buildMockSkeleton } from './atx-mock-documentation.component.test.util';

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
