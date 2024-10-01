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

const buildMockSkeleton = ():HttpMockConfig => {
  const cfg: HttpMockConfig = {
    interceptors: []
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
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('should not render anything by default', () => {
    expect(fixture.nativeElement.shadowRoot.querySelectorAll('section').length).toEqual(0);
  });
  
  it('should create HTML structure when the config property is set', async() => {
    const shadowRoot: DocumentFragment = fixture.debugElement.nativeElement.shadowRoot;
    component.config = buildMockSkeleton();
    fixture.detectChanges();
    await fixture.whenStable().then(()=> {
      console.log("test", shadowRoot)
      expect(shadowRoot.querySelectorAll('section').length).toEqual(2);
    });
  });
  
  it('title should be "HTTP Mock API" by default', () => {
    expect(component.title).toEqual("HTTP Mock API" );
  });
  
  /*it('title should be displayed when the config property is set', () => {
    component.config = buildMockSkeleton();
    expect(component.title).toEqual("HTTP Mock API" );
  });*/
});
