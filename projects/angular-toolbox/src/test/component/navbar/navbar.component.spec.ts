/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from 'projects/angular-toolbox/src/public-api';
import { NavbarTestComponent } from './util/navbar-test.component';
import { EventEmitter } from '@angular/core';
import { buildMediaQueryList } from './util/navbar-test.utils';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });

  it('stateChange property should be of type of EventEmitter', () => {
    expect(component.stateChange).toBeInstanceOf(EventEmitter);
  });

  it('brandLabel property should be undefined by default', () => {
    expect(component.brandLabel).toBeUndefined();
  });

  it('brandLabel property should set the aria-label property of the atx-brand div', () => {
    const testString = "test string: seed = " + Math.random();
    component.brandLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-brand");
    expect(div.getAttribute("aria-label")).toEqual(testString);
  });

  it('expandedLabel property should be undefined by default', () => {
    expect(component.expandedLabel).toBeUndefined();
  });

  it('expandedLabel property should not set the aria-label property of the atx-burger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.expandedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    expect(div.getAttribute("aria-label")).not.toEqual(testString);
  });


  it('expandedLabel property should not set the title property of the atx-burger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.expandedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    expect(div.getAttribute("title")).not.toEqual(testString);
  });

  it('collapsedLabel property should be undefined by default', () => {
    expect(component.collapsedLabel).toBeUndefined();
  });

  it('collapsedLabel property should set the aria-label property of the atx-burger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.collapsedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    expect(div.getAttribute("aria-label")).toEqual(testString);
  });

  it('collapsedLabel property should set the title property of the atx-burger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.collapsedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    expect(div.getAttribute("title")).toEqual(testString);
  });

  it('isResponsiveMode() method should return false in non-responsive mode', () => {
    expect(component.isResponsiveMode()).toBeFalse();
  });

  it('isOpen() method should return false by default', () => {
    expect(component.isOpen()).toBeFalse();
  });

  it('open() method should do nothing in non-responsive mode', () => {
    spyOn(component.stateChange, "emit");
    component.open();
    fixture.detectChanges();
    expect(component.isOpen()).toBeFalse();
    expect(component.stateChange.emit).not.toHaveBeenCalled();
  });

  it('close() method should do nothing in non-responsive mode', () => {
    spyOn(component.stateChange, "emit");
    component.close();
    fixture.detectChanges();
    expect(component.stateChange.emit).not.toHaveBeenCalled();
  });
  
  it('isOpen() method should return true when this open() method is invoked in non-responsive mode', () => {
    component.open();
    fixture.detectChanges();
    expect(component.isOpen()).toBeFalse();
  });

  it('breakpoint should be 768 by default', () => {
    expect(component.breakpoint).toEqual(768);
  });
});

describe('NavbarComponent: HTML structure', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a nav element with "atx-navbar" class name and "menubar" role', () => {
    const nav = fixture.nativeElement.querySelector("nav");
    expect(nav.classList.contains("atx-navbar")).toBeTrue();
    expect(nav.getAttribute("role")).toEqual("menubar" );
  });

  it('should have a div element with "atx-menu-action" class name', () => {
    const div = fixture.nativeElement.querySelector(".atx-menu-action");
    expect(div).toBeTruthy();
  });

  it('should have a div element with "atx-brand" class name', () => {
    const div = fixture.nativeElement.querySelector(".atx-brand");
    expect(div).toBeTruthy();
  });

  it('should have a div element with "atx-burger" class name and "button" role', () => {
    const div = fixture.nativeElement.querySelector(".atx-burger");
    expect(div).toBeTruthy();
    expect(div.getAttribute("role")).toEqual("button");
  });

  it('should have a div element with "atx-menu" class name and "menu" role', () => {
    const ul = fixture.nativeElement.querySelector("ul");
    expect(ul).toBeTruthy();
    expect(ul.classList.contains("atx-menu")).toBeTrue();
    expect(ul.getAttribute("role")).toEqual("menu");
  });

  it('should not have "atx-menu-open" class name reference in non-responsive mode', () => {
    const div = fixture.nativeElement.querySelector(".atx-menu-open");
    expect(div).toBeFalsy();
  });

  it('should not have "atx-navbar-responsive" class name reference when is not in responsive mode', () => {
    const elm = fixture.nativeElement.querySelector(".atx-navbar-responsive");
    expect(elm).toBeFalsy();
  });
});

describe('NavbarComponent: content projection', () => {
  let component: NavbarTestComponent;
  let fixture: ComponentFixture<NavbarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create content based on the brand tag projection whithin the "atx-brand" div', () => {
    const div = fixture.nativeElement.querySelector(".atx-brand");
    const brand = div.querySelector("#brand");
    expect(brand).toBeTruthy();
    expect(brand.textContent).toEqual("Brand");
  });
  
  it('should create content based on the icon tag projection whithin the "atx-burger" div', () => {
    const div = fixture.nativeElement.querySelector(".atx-burger");
    const icon = div.querySelector("#icon");
    expect(icon).toBeTruthy();
  });
  
  it('should create content based on the root element content', () => {
    const menu = fixture.nativeElement.querySelector(".atx-menu");
    const liList = menu.querySelectorAll("li");
    expect(liList.length).toEqual(4);
  });
});

describe('NavbarComponent: responsive mode', () => {
  let component: NavbarTestComponent;
  let fixture: ComponentFixture<NavbarTestComponent>;
  let navbar: NavbarComponent;

  const MEDIA_QUERY: MediaQueryList = buildMediaQueryList();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTestComponent);
    component = fixture.componentInstance;
    
    spyOn(window, "matchMedia").and.returnValue(MEDIA_QUERY);
    fixture.detectChanges();
    navbar = component.navbar;
  });
    
  it('isResponsiveMode() method should return true in responsive mode', () => {
    expect(navbar.isResponsiveMode()).toBeTrue();
  });
  
  it('should have "atx-navbar-responsive" class name reference when is in responsive mode', () => {
    const elm = fixture.nativeElement.querySelector(".atx-navbar-responsive");
    expect(elm).toBeTruthy();
  });

  it('expandedLabel property should set the aria-label property of the atx-burger div in responsive mode when menu is open', () => {
    const testString = "test string: seed = " + Math.random();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    navbar.open();
    fixture.detectChanges();
    expect(div.getAttribute("aria-label")).not.toEqual(testString);
    navbar.expandedLabel = testString;
    fixture.detectChanges();
    expect(div.getAttribute("aria-label")).toEqual(testString);
  });

  it('expandedLabel property should set the title property of the atx-burger div in responsive mode when menu is open', () => {
    const testString = "test string: seed = " + Math.random();
    const div = fixture.nativeElement.querySelector(".atx-burger");
    navbar.open();
    fixture.detectChanges();
    expect(div.getAttribute("title")).not.toEqual(testString);
    navbar.expandedLabel = testString;
    fixture.detectChanges();
    expect(div.getAttribute("title")).toEqual(testString);
  });
  
  it('isOpen() method should return false by default in responsive mode', () => {
    expect(navbar.isOpen()).toBeFalse();
  });
  
  it('open() method should add the atx-menu-open class to the DOM in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    expect(nav.classList.contains("atx-menu-open")).toBeTrue();
  });

  it('open() method should emit a stateChange eventin responsive mode', () => {
    spyOn(navbar.stateChange, "emit");
    navbar.open();
    fixture.detectChanges();
    expect(navbar.stateChange.emit).toHaveBeenCalledWith(true);
  });

  it('open() method should not emit a stateChange event when the menu is already open in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    spyOn(navbar.stateChange, "emit");
    navbar.open();
    fixture.detectChanges();
    expect(navbar.stateChange.emit).not.toHaveBeenCalledWith();
  });

  it('isOpen() method should return true when the open() method is invoked in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    expect(navbar.isOpen()).toBeTrue();
  });
  
  it('close() method should remove the atx-menu-open class from the DOM in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    navbar.close();
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    expect(nav.classList.contains("atx-menu-open")).toBeFalse();
  });

  it('close() method should emit a stateChange event in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    spyOn(navbar.stateChange, "emit");
    navbar.close();
    fixture.detectChanges();
    expect(navbar.stateChange.emit).toHaveBeenCalledWith(false);
  });

  it('close() method should not emit a stateChange event in responsive mode when menu is already closed', () => {
    navbar.open();
    fixture.detectChanges();
    navbar.close();
    fixture.detectChanges();
    spyOn(navbar.stateChange, "emit");
    navbar.close();
    fixture.detectChanges();
    expect(navbar.stateChange.emit).not.toHaveBeenCalledWith();
  });

  it('isOpen() method should return false when the close() method is invoked in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    navbar.close();
    fixture.detectChanges()
    expect(navbar.isOpen()).toBeFalse();
  });
  
  it('clicking the hanburger element should open the menu in responsive mode', () => {
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    const hanburger = fixture.nativeElement.querySelector(".atx-burger");
    spyOn(navbar.stateChange, "emit");
    hanburger.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(navbar.stateChange.emit).toHaveBeenCalledWith(true);
    expect(navbar.isOpen()).toBeTrue();
    expect(nav.classList.contains("atx-menu-open")).toBeTrue();
  });
  
  it('clicking the hanburger element when menu is open should close the menu in responsive mode', () => {
    navbar.open();
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    const hanburger = fixture.nativeElement.querySelector(".atx-burger");
    spyOn(navbar.stateChange, "emit");
    hanburger.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    expect(navbar.stateChange.emit).toHaveBeenCalledWith(false);
    expect(navbar.isOpen()).toBeFalse();
    expect(nav.classList.contains("atx-menu-open")).toBeFalse();
  });
});

describe('NavbarComponent: responsive mode switching', () => {
  let component: NavbarTestComponent;
  let fixture: ComponentFixture<NavbarTestComponent>;
  let navbar: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTestComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    navbar = component.navbar;
  });

  it('resizing the window should switch from normal to responsive mode', () => {
    expect(navbar.isResponsiveMode()).toBeFalse();
    const MEDIA_QUERY: MediaQueryList = buildMediaQueryList();
    spyOn(window, "matchMedia").and.returnValue(MEDIA_QUERY);
    window.dispatchEvent(new Event("resize"));
    fixture.detectChanges();
    expect(navbar.isResponsiveMode()).toBeTrue();
  });

  it('resizing the window should switch from responsive to normal mode', () => {
    expect(navbar.isResponsiveMode()).toBeFalse();
    let spyObj = spyOn(window, "matchMedia").and.returnValue(buildMediaQueryList());
    window.dispatchEvent(new Event("resize"));
    fixture.detectChanges();
    expect(navbar.isResponsiveMode()).toBeTrue();
    spyObj.and.returnValue(buildMediaQueryList(false));
    window.dispatchEvent(new Event("resize"));
    fixture.detectChanges();
    expect(navbar.isResponsiveMode()).toBeFalse();
  });
  
  it('switching from responsive to normal mode should ensure that menu is collapsed', () => {
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    expect(navbar.isResponsiveMode()).toBeFalse();
    let spyObj = spyOn(window, "matchMedia").and.returnValue(buildMediaQueryList());
    window.dispatchEvent(new Event("resize"));
    fixture.detectChanges();
    navbar.open();
    fixture.detectChanges();
    expect(navbar.isOpen()).toBeTrue();
    expect(nav.classList.contains("atx-menu-open")).toBeTrue();
    spyObj.and.returnValue(buildMediaQueryList(false));
    window.dispatchEvent(new Event("resize"));
    fixture.detectChanges();
    expect(navbar.isOpen()).toBeFalse();
    expect(nav.classList.contains("atx-menu-open")).toBeFalse();
  });
  
  it('changing the brekpoint value should update the responsive mode', () => {
    const nav = fixture.nativeElement.querySelector(".atx-navbar");
    expect(navbar.isResponsiveMode()).toBeFalse();
    navbar.breakpoint = 3000;
    fixture.detectChanges();
    expect(navbar.isResponsiveMode()).toBeTrue();
    expect(nav.classList.contains("atx-navbar-responsive")).toBeTrue();
  });
});

