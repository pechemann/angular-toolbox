/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LINK_ROLE, AnchorLinklDirective } from "../../public-api";
import { AnchorDirectiveTestComponent } from "./test-utils/anchor-directive-test.util";
import { MockElementRef } from "./test-utils/mock-element-ref";
import { Router, RouterModule } from "@angular/router";
import { DOCUMENT } from "@angular/common";

describe('AnchorLinklDirective', () => {

    let fixture: ComponentFixture<AnchorDirectiveTestComponent>;
    let decoratedElm: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AnchorLinklDirective
            ],
            declarations: [
                AnchorDirectiveTestComponent
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AnchorDirectiveTestComponent);
        fixture.detectChanges();
        decoratedElm = fixture.nativeElement.querySelector("#testElm");
    });

    it('should create a "role" atribute on the decorated HTML element', () => {
        expect(decoratedElm.hasAttribute("role")).toBe(true);
    });
    
    it('should create a "role" atribute set to "button"', () => {
        expect(decoratedElm.getAttribute("role")).toBe(LINK_ROLE);
    });
    
    it('should create a "tabIndex" atribute on the decorated HTML element', () => {
        expect(decoratedElm.hasAttribute("tabIndex")).toBe(true);
    });

    it('should create a "tabIndex" atribute set to "0"', () => {
        expect(decoratedElm.getAttribute("tabIndex")).toBe("0");
    });
});

describe('AnchorLinklDirective: invalid element', () => {

    it('should throw an error when the "href" atribute is not defined on the decorated HTML element', async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
                AnchorLinklDirective
            ],
        }).compileComponents();
        const mockElementRef: MockElementRef = new MockElementRef();
        const doc: Document = TestBed.inject(DOCUMENT);
        const router: Router = TestBed.inject(Router);
        const directive: AnchorLinklDirective = new AnchorLinklDirective(doc, mockElementRef, router);
        expect(()=> directive.ngAfterViewInit()).toThrow(new ReferenceError("href attribute is not defined."));
    });
});