/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogOutlet, DialogOutletEvent, DialogService } from "projects/angular-toolbox/src/public-api";
import { DialogTestComponent } from "./util/dialog-test.component";
import { Subscription } from "rxjs";

describe('DialogService', () => {

    it('should create a new instance', () => {
        const svc: DialogService = new DialogService();
        expect(svc).toBeTruthy();
    });

    it('show should throw a DialogServiceError error when the DiologOutlet component is missing', () => {
        const svc: DialogService = new DialogService();
        const invalidInstance = ()=> {
            svc.show(null);
        };
        expect(invalidInstance).toThrowError("DialogOutlet missing: you must add the <atx-dialog-outlet/> tag to your application before using dialog services.");
    });

    it('show should throw a DialogServiceError error when the DiologOutlet component is missing', () => {
        const svc: DialogService = new DialogService();
        const invalidInstance = ()=> {
            svc.show(null);
        };
        expect(invalidInstance).toThrowError("DialogOutlet missing: you must add the <atx-dialog-outlet/> tag to your application before using dialog services.");
    });

    it('show should return a conponent reference with the correct generic type', async() => {
        await TestBed.configureTestingModule({
            imports: [DialogOutlet]
        }).compileComponents();
        const svc: DialogService = TestBed.inject(DialogService);
        const fixture:  ComponentFixture<DialogOutlet> = TestBed.createComponent(DialogOutlet);
        fixture.componentInstance.ngOnInit();
        fixture.detectChanges();
        const compref = svc.show(DialogTestComponent);
        expect(compref.componentType).toEqual(DialogTestComponent);
    });

    it('show should emit a DialogOutletEvent of the type of DialogOutletEvent.SHOW', async() => {
        await TestBed.configureTestingModule({
            imports: [DialogOutlet]
        }).compileComponents();
        const svc: DialogService = TestBed.inject(DialogService);
        const fixture:  ComponentFixture<DialogOutlet> = TestBed.createComponent(DialogOutlet);
        fixture.componentInstance.ngOnInit();
        const sub: Subscription = svc.dialogStateChange.subscribe((evt: DialogOutletEvent)=> {
            sub.unsubscribe();
            expect(evt.state).toEqual(DialogOutletEvent.SHOW);
        });
        fixture.detectChanges();
        svc.show(DialogTestComponent);
    });

    it('show should set the open attribute to the HTML dialog element', async() => {
        await TestBed.configureTestingModule({
            imports: [DialogOutlet]
        }).compileComponents();
        const svc: DialogService = TestBed.inject(DialogService);
        const fixture:  ComponentFixture<DialogOutlet> = TestBed.createComponent(DialogOutlet);
        fixture.componentInstance.ngOnInit();
        fixture.detectChanges();
        svc.show(DialogTestComponent);
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        expect(dialog.attributes.getNamedItem("open")).toBeDefined();
    });

    it('show should add the custom component into the dialog outlet viewport', async() => {
        await TestBed.configureTestingModule({
            imports: [DialogOutlet]
        }).compileComponents();
        const svc: DialogService = TestBed.inject(DialogService);
        const fixture:  ComponentFixture<DialogOutlet> = TestBed.createComponent(DialogOutlet);
        fixture.componentInstance.ngOnInit();
        fixture.detectChanges();
        svc.show(DialogTestComponent);
        const customComp: HTMLElement = fixture.nativeElement.querySelector("app-dialog-test");
        expect(customComp).toBeDefined();
    });
    
    it('hide should emit a DialogOutletEvent of the type of DialogOutletEvent.HIDE', (done) => {
        const svc: DialogService = new DialogService();
        const sub: Subscription = svc.dialogStateChange.subscribe((evt: DialogOutletEvent)=> {
            sub.unsubscribe();
            expect(evt.state).toEqual(DialogOutletEvent.HIDE);
            done();
        });
        svc.hide();
    });

    it('__init__ should return true when the display container ref is set', () => {
        const svc: DialogService = new DialogService();
        const mockContainer: any = {};
        expect(svc.__init__(mockContainer)).toBeTrue();
    });

    it('__init__ should return false when the display container ref has already been set', () => {
        const svc: DialogService = new DialogService();
        const mockContainer: any = {};
        svc.__init__(mockContainer);
        expect(svc.__init__(mockContainer)).toBeFalse();
    });
});