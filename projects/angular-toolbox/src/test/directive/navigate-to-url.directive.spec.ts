/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavigateToUrlDirective } from "../../public-api";
import { NavigateToUrlDirectiveNoHrefTestComponent, NavigateToUrlDirectiveTestComponent } from "./navigate-to-url-test.util";

describe('NavigateToUrlDirective', () => {
  
  let fixture: ComponentFixture<NavigateToUrlDirectiveTestComponent>;
  let decoratedElm: HTMLElement;

  beforeEach(async () => {
    /*window.onbeforeunload = () => EMPTY_STRING;
    window.onbeforeunload = jasmine.createSpy();*/
    await TestBed.configureTestingModule({
      imports: [
        NavigateToUrlDirective
      ],
      declarations: [
        NavigateToUrlDirectiveTestComponent
      ],
      providers: []
    }).compileComponents(); 
    fixture = TestBed.createComponent(NavigateToUrlDirectiveTestComponent);
    fixture.detectChanges();
    decoratedElm = fixture.nativeElement.querySelector("#testElm");
  });

  it('should create a "role" atribute on the decorated HTML element', () => {
    expect(decoratedElm.hasAttribute("role")).toBe(true);
  });

  it('should create a "role" atribute set to "button"', () => {
    expect(decoratedElm.getAttribute("role")).toBe("button");
  });

  it('should create a "tabIndex" atribute on the decorated HTML element', () => {
    expect(decoratedElm.hasAttribute("tabIndex")).toBe(true);
  });

  it('should create a "tabIndex" atribute set to "0"', () => {
    expect(decoratedElm.getAttribute("tabIndex")).toBe("0");
  });
  
  /*it('should redirect the page to the URL specified by the href property', () => {
    decoratedElm.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(documentMock.defaultView?.location.href).toBe(TEST_URL);
  });*/
});

/*describe('NavigateToUrlDirective with invalid href', () => {

  let fixture: ComponentFixture<NavigateToUrlDirectiveNoHrefTestComponent>;
  let decoratedElm: HTMLElement;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
          imports: [
            NavigateToUrlDirective
          ],
          declarations: [
            NavigateToUrlDirectiveNoHrefTestComponent
          ]
      }).compileComponents();
      fixture = TestBed.createComponent(NavigateToUrlDirectiveNoHrefTestComponent);
      fixture.detectChanges();
      decoratedElm = fixture.nativeElement.querySelector("#testElm");
  });

  it('should throw a ReferenceError when "href" property is not defined"', () => {
    
  });
});*/
