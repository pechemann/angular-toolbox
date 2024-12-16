/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY_STRING, NavbarComponent } from 'projects/angular-toolbox/src/public-api';
import { NavbarTestComponent } from './util/navbar-test.component';
import { EventEmitter } from '@angular/core';

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

  it('brandLabel property should be an empty string by default', () => {
    expect(component.brandLabel).toEqual(EMPTY_STRING);
  });

  it('brandLabel property should set the aria-label property of the atx-brand div', () => {
    const testString = "test string: seed = " + Math.random();
    component.brandLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-brand");
    expect(div.getAttribute("aria-label")).toEqual(testString);
  });

  it('expandedLabel property should be an empty string by default', () => {
    expect(component.expandedLabel).toEqual(EMPTY_STRING);
  });

  it('expandedLabel property should not set the aria-label property of the atx-hamburger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.expandedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    expect(div.getAttribute("aria-label")).not.toEqual(testString);
  });


  it('expandedLabel property should not set the title property of the atx-hamburger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.expandedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    expect(div.getAttribute("title")).not.toEqual(testString);
  });

  it('collapsedLabel property should be an empty string by default', () => {
    expect(component.collapsedLabel).toEqual(EMPTY_STRING);
  });

  it('collapsedLabel property should set the aria-label property of the atx-hamburger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.collapsedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    expect(div.getAttribute("aria-label")).toEqual(testString);
  });

  it('collapsedLabel property should set the title property of the atx-hamburger div in non-responsive mode', () => {
    const testString = "test string: seed = " + Math.random();
    component.collapsedLabel = testString;
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    expect(div.getAttribute("title")).toEqual(testString);
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

  it('should have a div element with "atx-hamburger" class name and "button" role', () => {
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    expect(div).toBeTruthy();
    expect(div.getAttribute("role")).toEqual("button");
  });

  it('should have a ul element with "atx-menu-list" class', () => {
    const ul = fixture.nativeElement.querySelector("ul");
    expect(ul.classList.contains("atx-menu-list")).toBeTrue();
  });

  it('should have a div element with "atx-menu" class name and "menu" role', () => {
    const div = fixture.nativeElement.querySelector(".atx-menu");
    expect(div).toBeTruthy();
    expect(div.getAttribute("role")).toEqual("menu");
  });

  it('should not have "atx-menu-opened" class name reference in non-responsive mode', () => {
    const div = fixture.nativeElement.querySelector(".atx-menu-opened");
    expect(div).toBeFalsy();
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
  
  it('should create content based on the icon tag projection whithin the "atx-hamburger" div', () => {
    const div = fixture.nativeElement.querySelector(".atx-hamburger");
    const icon = div.querySelector("#icon");
    expect(icon).toBeTruthy();
  });
  
  it('should create content based on the root element content', () => {
    const menu = fixture.nativeElement.querySelector(".atx-menu");
    const liList = menu.querySelectorAll("li");
    expect(liList.length).toEqual(4);
  });
});

