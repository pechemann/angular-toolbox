/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { INJECTED_HTML_CONTENT, RenderContentDirectiveTestComponent } from "./test-utils/render-content-test.util";

describe('RenderContentDirective', () => {
  
  let fixture: ComponentFixture<RenderContentDirectiveTestComponent>;
  let decoratedElm: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RenderContentDirectiveTestComponent
      ],
      providers: []
    }).compileComponents(); 
    fixture = TestBed.createComponent(RenderContentDirectiveTestComponent);
    spyOn(fixture.componentInstance, "onRendered");
    fixture.detectChanges();
    decoratedElm = fixture.nativeElement.querySelector("#testElm");
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('"innerHTML" attribute should inject content', () => {
    expect((decoratedElm.firstChild)).toBeTruthy();
  });

  it('injected content should refer to the value specified by the "innerHTML" attribute', () => {
    expect((decoratedElm.innerHTML)).toEqual(INJECTED_HTML_CONTENT);
  });
  
  it('"rendered" event should have been dispatched after content injection', (done) => {
    const component: RenderContentDirectiveTestComponent = fixture.componentInstance;
    component.content = "New Content";
    fixture.detectChanges();
    setTimeout(()=> {
      expect(fixture.componentInstance.onRendered).toHaveBeenCalled();
      done();
    }, 10);
  });
  
  it('"rendered" event target should refer to the decorated HTML element', (done) => {
    const component: RenderContentDirectiveTestComponent = fixture.componentInstance;
    component.content = "New Content";
    fixture.detectChanges();
    setTimeout(()=> {
      expect(fixture.componentInstance.onRendered).toHaveBeenCalledWith(decoratedElm);
      done();
    }, 10);
  });
});
