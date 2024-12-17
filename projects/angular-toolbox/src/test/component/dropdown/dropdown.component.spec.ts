/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, DropdownEvent, DropdownEventType } from 'projects/angular-toolbox/src/public-api';
import { DropdownTestComponent } from './dropdown-component.test.util';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create a HTML button with the popovertarget set by using the component ID', () => {
    const btn = fixture.nativeElement.querySelector("button");
    expect(btn.getAttribute("popovertarget")).toEqual(component.getID().toString());
  });

  it('should create a HTML popover container with the id set by using the component ID', () => {
    const popover: any = document.getElementById(component.getID().toString());
    expect(popover).toBeTruthy();
  });

  it('should create a HTML popover container with popover equal to "auto" by default', () => {
    const popover: any = document.getElementById(component.getID().toString());
    expect(popover.getAttribute("popover")).toEqual("auto");
  });

  it('popoverState should change the HTML popover value', () => {
    component.popoverState = "manual";
    fixture.detectChanges();
    const popover: any = document.getElementById(component.getID().toString());
    expect(popover.getAttribute("popover")).toEqual("manual");
  });

  it('buttonClass should be undefined by default', () => {
    expect(component.buttonClass).toBeUndefined();
  });

  it('buttonClass should update the class property of the HTML button', () => {
    component.buttonClass = 'test-class color-red';
    const btn = fixture.nativeElement.querySelector("button");
    fixture.detectChanges();
    expect(btn.classList.contains("test-class")).toBeTrue();
    expect(btn.classList.contains("color-red")).toBeTrue();
  });
  
  it('containerClass should be undefined by default', () => {
    expect(component.containerClass).toBeUndefined();
  });

  it('containerClass should update the class property of the main container', () => {
    component.containerClass = 'test-class color-red';
    const container: any = fixture.nativeElement.querySelector(".atx-dropdown-container");
    fixture.detectChanges();
    expect(container.classList.contains("test-class")).toBeTrue();
    expect(container.classList.contains("color-red")).toBeTrue();
  });
  
  it('vPos should be "bottom" by default', () => {
    expect(component.vPos).toEqual("bottom");
  });
  
  it('hPos should be "left" by default', () => {
    expect(component.hPos).toEqual("left");
  });

  it('vPos "start" should use the "atx-dropdown-v-start" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.vPos = "start";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-v-start")).toBeTrue();
  });

  it('vPos "start" should use the "atx-dropdown-top" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.vPos = "top";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-top")).toBeTrue();
  });

  it('vPos "start" should use the "atx-dropdown-middle" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.vPos = "middle";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-middle")).toBeTrue();
  });

  it('vPos "start" should use the "atx-dropdown-bottom" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.vPos = "bottom";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-bottom")).toBeTrue();
  });

  it('vPos "start" should use the "atx-dropdown-v-end" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.vPos = "end";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-v-end")).toBeTrue();
  });

  it('hPos "start" should use the "atx-dropdown-h-start" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "start";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-h-start")).toBeTrue();
  });

  it('hPos "left" should use the "atx-dropdown-left" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "left";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-left")).toBeTrue();
  });

  it('hPos "center" should use the "atx-dropdown-center" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "center";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-center")).toBeTrue();
  });

  it('hPos "right" should use the "atx-dropdown-right" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "right";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-right")).toBeTrue();
  });

  it('hPos "start" should use the "atx-dropdown-h-end" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "end";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-h-end")).toBeTrue();
  });

  it('hPos "center" combined with vPos "middle" should use the "atx-dropdown-centered" CSS class', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    component.hPos = "center";
    component.vPos = "middle";
    fixture.detectChanges();
    expect(popover.classList.contains("atx-dropdown-centered")).toBeTrue();
  });

  it('isOpen() should return false by default', () => {
    expect(component.isOpen()).toBeFalse();
  });

  it('showContent() should display the popover', () => {
    const popover: any = document.getElementById(component.getID().toString());
    component.showContent();
    fixture.detectChanges();
    expect(popover.matches(":popover-open")).toBeTrue();
  });

  it('isOpen() should return true affer invoking the showContent() method', () => {
    component.showContent();
    fixture.detectChanges();
    expect(component.isOpen()).toBeTrue();
  });

  it('hideContent() should hide the popover', () => {
    const popover: any = document.getElementById(component.getID().toString());
    component.showContent();
    fixture.detectChanges();
    component.hideContent();
    fixture.detectChanges();
    expect(popover.matches(":popover-open")).toBeFalse();
  });

  it('isOpen() should return false affer invoking the hideContent() method', () => {
    component.showContent();
    fixture.detectChanges();
    component.hideContent();
    fixture.detectChanges();
    expect(component.isOpen()).toBeFalse();
  });

  it('isOpen() should return true affer clicking the button to show the content', () => {
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    expect(component.isOpen()).toBeTrue();
  });

  it('isOpen() should return false affer clicking the button to hide the content', () => {
    component.showContent();
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    expect(component.isOpen()).toBeFalse();
  });

  it('clicking the button to show the content should trigger a beforeToggle event', (done) => {
    const sub = component.beforeToggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      expect(event.oldState).toEqual("closed");
      expect(event.newState).toEqual("open");
      expect(event.type).toEqual(DropdownEventType.BEFORE_TOGGLE);
      done();
    });
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
  });

  it('clicking the button to hide the content should trigger a beforeToggle event', (done) => {
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    setInterval(()=> {
      const sub = component.beforeToggle.subscribe((event: DropdownEvent)=> {
        sub.unsubscribe();
        expect(event.target).toBe(component);
        expect(event.oldState).toEqual("open");
        expect(event.newState).toEqual("closed");
        expect(event.type).toEqual(DropdownEventType.BEFORE_TOGGLE);
        done();
      });
      btn.dispatchEvent(new MouseEvent("click"));
      fixture.detectChanges();
    }, 10);
  });

  it('clicking the button to show the content should trigger a toggle event', (done) => {
    const sub = component.toggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      expect(event.oldState).toEqual("closed");
      expect(event.newState).toEqual("open");
      expect(event.type).toEqual(DropdownEventType.TOGGLE);
      done();
    });
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
  });

  it('clicking the button to hide the content should trigger a toggle event', (done) => {
    const btn = fixture.nativeElement.querySelector("button");
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
    const sub = component.toggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      // Test environment limitations:
      /*expect(event.oldState).toEqual("open");
      expect(event.newState).toEqual("closed");*/
      expect(event.type).toEqual(DropdownEventType.TOGGLE);
      done();
    });
    btn.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();
  });

  it('showContent() should trigger a beforeToggle event', (done) => {
    const sub = component.beforeToggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      expect(event.oldState).toEqual("closed");
      expect(event.newState).toEqual("open");
      expect(event.type).toEqual(DropdownEventType.BEFORE_TOGGLE);
      done();
    });
    component.showContent();
    fixture.detectChanges();
  });

  it('showContent() should trigger a toggle event', (done) => {
    const sub = component.toggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      expect(event.oldState).toEqual("closed");
      expect(event.newState).toEqual("open");
      expect(event.type).toEqual(DropdownEventType.TOGGLE);
      done();
    });
    component.showContent();
    fixture.detectChanges();
  });

  it('hideContent() should trigger a beforeToggle event', (done) => {
    component.showContent();
    fixture.detectChanges();
    const sub = component.beforeToggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      expect(event.oldState).toEqual("open");
      expect(event.newState).toEqual("closed");
      expect(event.type).toEqual(DropdownEventType.BEFORE_TOGGLE);
      done();
    });
    component.hideContent();
    fixture.detectChanges();
  });

  it('hideContent() should trigger a toggle event', (done) => {
    component.showContent();
    fixture.detectChanges();
    const sub = component.toggle.subscribe((event: DropdownEvent)=> {
      sub.unsubscribe();
      expect(event.target).toBe(component);
      // Test environment limitations:
      /*expect(event.oldState).toEqual("open");
      expect(event.newState).toEqual("closed");*/
      expect(event.type).toEqual(DropdownEventType.TOGGLE);
      done();
    });
    component.hideContent();
    fixture.detectChanges();
  });

  it('beforeToggle event should preceed toggle event', (done) => {
    let beforeToggleCalled: boolean = false;
    const sub1 = component.beforeToggle.subscribe((event: DropdownEvent)=> beforeToggleCalled = true);
    const sub2 = component.toggle.subscribe((event: DropdownEvent)=> {
      sub1.unsubscribe();
      sub2.unsubscribe();
      expect(beforeToggleCalled).toBeTrue();
      done();
    });
    component.showContent();
    fixture.detectChanges();
  });

  it('disabled should be false by default', () => {
    expect(component.disabled).toBeFalse();
  });

  it('should disable the dropbox button when disabled is true', () => {
    const btn = fixture.nativeElement.querySelector("button");
    component.disabled = true;
    fixture.detectChanges();
    expect(btn.disabled).toBeTrue();
  });

  it('should hide the dropbox content when setting disabled to true', () => {
    spyOn(component, 'hideContent');
    component.disabled = true;
    fixture.detectChanges();
    expect(component.hideContent).toHaveBeenCalled();
  });

  it('should prevent the dropbox content to be displayed when disabled is true', () => {
    const popover: any = document.getElementById(component.getID().toString());
    component.disabled = true;
    component.showContent();
    fixture.detectChanges();
    expect(popover.matches(":popover-open")).toBeFalse();
  });
});

describe('DropdownComponent: content projection', () => {
  let component: DropdownTestComponent;
  let fixture: ComponentFixture<DropdownTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownTestComponent, DropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the button content', () => {
    const btn = fixture.nativeElement.querySelector("button");
    expect(btn.textContent).toContain("Button Label");
  });

  it('should render the popup container content', () => {
    const popover: any = fixture.nativeElement.querySelector(".atx-dropdown-popover");
    expect(popover.textContent).toContain("Content text...");
  });
});
