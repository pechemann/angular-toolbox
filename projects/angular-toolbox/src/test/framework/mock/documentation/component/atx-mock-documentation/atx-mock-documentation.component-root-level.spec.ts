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
import { buildMockSkeleton } from './atx-mock-documentation.component.test.util';

describe('AtxMockDocumentation: Root Level', () => {
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
