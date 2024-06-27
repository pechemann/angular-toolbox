/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/pechemann/angular-toolbox/blob/main/LICENSE
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BUTTON_ROLE, ButtonRoleDirective } from "../../public-api";
import { Router, RouterModule } from "@angular/router";
import { ButtonRoleDirectiveTestComponent, ButtonRoleDirectiveWithDelegationTestComponent, ButtonRoleDirectiveWithRouterLinkTestComponent, Key, TEST_ITEM } from "./test-utils/button-role-directive-test.util";

const createKeyEvent = (event: string, key: string) => new KeyboardEvent(event, { key: key });

describe('ButtonRoleDirective', () => {

    let fixture: ComponentFixture<ButtonRoleDirectiveTestComponent>;
    let decoratedElm: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
                ButtonRoleDirective
            ],
            declarations: [
                ButtonRoleDirectiveTestComponent
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ButtonRoleDirectiveTestComponent);
        spyOn(fixture.componentInstance, 'onEnter');
        fixture.detectChanges();
        decoratedElm = fixture.nativeElement.querySelector("#testElm");
    });

    it('should create a "role" atribute on the decorated HTML element', () => {
        expect(decoratedElm.hasAttribute("role")).toBe(true);
    });
    
    it('should create a "role" atribute set to "button"', () => {
        expect(decoratedElm.getAttribute("role")).toBe(BUTTON_ROLE);
    });
    
    it('should create a "tabIndex" atribute on the decorated HTML element', () => {
        expect(decoratedElm.hasAttribute("tabIndex")).toBe(true);
    });

    it('should create a "tabIndex" atribute set to "0"', () => {
        expect(decoratedElm.getAttribute("tabIndex")).toBe("0");
    });
    
    it('should dispatch an "enter" event when User presses the "enter" key', () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        expect(fixture.componentInstance.onEnter).toHaveBeenCalled();
    });
    
    it('should dispatch an "enter" event and pass the specified object as property', () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        expect(fixture.componentInstance.onEnter).toHaveBeenCalledWith(TEST_ITEM);
    });
    
    it('should not dispatch "enter" event when User presses any key (except for "enter" key)', () => {
        const keys: string[] = Object.values(Key);
        keys.forEach((value: string) => {
            decoratedElm.dispatchEvent(createKeyEvent('keyup', 'value'));
        });
        fixture.detectChanges();
        expect(fixture.componentInstance.onEnter).not.toHaveBeenCalled();
    });

    it('should invoke the "blur()" method on the decorated element after event dispatching', () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBe(document.activeElement as any);
    });

    it('should not dispatch "enter" event whether "delegateClick" attribute is not defined and User clicks on decorated element', () => {
        decoratedElm.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(fixture.componentInstance.onEnter).not.toHaveBeenCalled();
    });

});

describe('ButtonRoleDirective with delegation', () => {
    
    let fixture: ComponentFixture<ButtonRoleDirectiveWithDelegationTestComponent>;
    let decoratedElm: HTMLElement;

    it('should dispatch "enter" event whether "delegateClick" attribute is defined and User clicks on decorated element', async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
                ButtonRoleDirective
            ],
            declarations: [
                ButtonRoleDirectiveWithDelegationTestComponent
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ButtonRoleDirectiveWithDelegationTestComponent);
        spyOn(fixture.componentInstance, 'onEnter');
        decoratedElm = fixture.nativeElement.querySelector("#testElm");
        decoratedElm.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(fixture.componentInstance.onEnter).toHaveBeenCalled();
    });
});

describe('ButtonRoleDirective with [routerLink] directive', () => {

    it('should navigate to the specified segment when [routerLink] directive is defined', async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                ButtonRoleDirective
            ],
            declarations: [
                ButtonRoleDirectiveWithRouterLinkTestComponent
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ButtonRoleDirectiveWithRouterLinkTestComponent);
        const router = TestBed.inject(Router);
        const navigateSpy = spyOn(router, 'navigate');
        const decoratedElm = fixture.nativeElement.querySelector("#testElm");
        // ngAfterViewChecked: Forces Angular to execute a directive life cycle before testing component
        fixture.componentInstance.ngAfterViewChecked();
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        expect(navigateSpy).toHaveBeenCalledWith(['/expectedUrl']);
    });
});