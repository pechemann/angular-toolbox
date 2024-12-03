/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogBackdropType, DialogOutlet, DialogService } from "projects/angular-toolbox/src/public-api";
import { DialogTestComponent } from "./util/dialog-test.component";

describe('DialogOutlet', () => {

    let outlet: DialogOutlet;
    let service: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DialogService]
        });
        service = TestBed.inject(DialogService);
        outlet = new DialogOutlet(service);
    })

    it('should create a new instance', () => {
        expect(outlet).toBeTruthy();
    });

    it('ngOnInit should invoke the __init__ method of the dialog service', () => {
        spyOn(service, "__init__");
        outlet.ngOnInit();
        expect(service.__init__).toHaveBeenCalled();
    });

    it('ngOnInit should invoke the subscribe method of the dialogStateChange object', () => {
        spyOn(service.dialogStateChange, "subscribe");
        outlet.ngOnInit();
        expect(service.dialogStateChange.subscribe).toHaveBeenCalled();
    });
});

describe('DialogOutlet I/O', () => {

    let outlet: DialogOutlet;
    let fixture: ComponentFixture<DialogOutlet>;
    let service: DialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DialogService]
        });
        fixture = TestBed.createComponent(DialogOutlet);
        service = fixture.debugElement.injector.get(DialogService);
        outlet = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('DialogService.hide() should close the HTML dialog element', () => {
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        service.show(DialogTestComponent);
        expect(dialog.attributes.getNamedItem("open")).toBeDefined();
        fixture.detectChanges();
        service.hide();
        fixture.detectChanges();
        expect(dialog.attributes.getNamedItem("open")).toBeNull();
    });
    
    it('DialogService.hide() should remove the custom component', (done) => {
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        service.show(DialogTestComponent);
        expect(dialog.attributes.getNamedItem("open")).toBeDefined();
        fixture.detectChanges();
        let customComp: HTMLElement = fixture.nativeElement.querySelector("app-dialog-test");  
        expect(customComp).toBeDefined();
        service.hide();
        fixture.detectChanges();
        setTimeout(()=> {
            customComp = fixture.nativeElement.querySelector("app-dialog-test");  
            expect(customComp).toBeNull();
            done();
        }, 0);
    });

    it('clicking on the custom component should not close the the HTML dialog element', () => {
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        service.show(DialogTestComponent);
        const customComp: HTMLElement = fixture.nativeElement.querySelector("app-dialog-test");
        customComp.click();
        fixture.detectChanges();
        expect(dialog.attributes.getNamedItem("open")).toBeDefined();
    });

    it('clicking outside the custom component should close the the HTML dialog element by default', () => {
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        const mouseUpEvt: Event = new Event("mouseup", { bubbles: true, cancelable: true });
        service.show(DialogTestComponent);
        dialog.dispatchEvent (mouseUpEvt);
        fixture.detectChanges();
        expect(dialog.attributes.getNamedItem("open")).toBeNull();
    });

    it('clicking outside the custom component should not close the the HTML dialog element when backdrop is equal to DialogBackdropType.STATIC', () => {
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector("dialog");
        const mouseUpEvt: Event = new Event("mouseup", { bubbles: true, cancelable: true });
        service.show(DialogTestComponent, { backdrop: DialogBackdropType.STATIC });
        dialog.dispatchEvent (mouseUpEvt);
        fixture.detectChanges();
        expect(dialog.attributes.getNamedItem("open")).toBeDefined();
    });
});